const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Solution = require("../model/solution");
const Student = require("../model/student");
const Set = require("../model/set");
const Grade = require("../model/grade");

exports.create = async (req, res) => {

    if(req.user.type != "student") return res.status(404).json({ error: "Only students authorized"})

    const student = await Student.findByPk(req.user.id);
    //does student exists 
    if (!student) return res.status(404).json({ error: "Student not found" });

    const { exam_name, solutions } = req.body;

    const set = await Set.findOne({
        where: {
            for_class: student.classes,
            name: exam_name
        }
        });
    //does set exists
    if(!set) return res.status(404).json({ error: "No exam set found"})

    const so = await Solution.findOne({
        where: {
            for_class: student.classes,
            rollno: student.rollno,
            exam_name
        }
        });

    //does solution exists
    if(so) return res.status(404).json({ error: "Solution already submitted"})
    
    //create solution
    const solution = await Solution.create({
        name: student.name,
        for_class: student.classes,
        rollno: student.rollno,
        exam_name,
        solutions
    });

    await solution.save();

    res.status(201).json({ message: "Solutions saved successfully" });
};


exports.grade =  async(req, res) => {

    if(req.user.type != "admin") return res.status(404).json({ error: "Only admin authorized"})
    
    const { marking_scheme, for_class, exam_name } = req.body

    const set = await Set.findOne({
        where: {
            for_class,
            name: exam_name
        }
        });
    //does set exists
    if(!set) return res.status(404).json({ error: "No exam set found"})

    const solutions = await Solution.findAll({
        where: {
            for_class,
            exam_name
        }
    });

    if (!solutions.length) res.status(404).json({ error: "No solution submitted" })

    for (const solution of solutions) {
        let marks = 0;
        const studentAnswers = solution.solutions;

        for (const [qNo, correctAns] of Object.entries(marking_scheme)) {
            if (studentAnswers[qNo] !== undefined && studentAnswers[qNo] === correctAns) {
                marks += 1;
            }
        }

        await Grade.create({
            name: solution.name,
            rollno: solution.rollno,
            for_class,
            exam_name,
            marks
        });
    }

    res.status(200).json({ message: "Grades calculated and saved successfully" });

}