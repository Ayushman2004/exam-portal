const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Solution = require("../model/solution");
const Student = require("../model/student");
const Set = require("../model/set");

exports.create = async (req, res) => {

    if(req.user.type != "student") return res.status(404).json({ error: "Only students authorized"})

    const student = await Student.findByPk(req.user.id);
    if (!student) return res.status(404).json({ error: "Student not found" });

    const { exam_name, solutions } = req.body;

    const set = await Set.findOne({
        where: {
            for_class: student.classes,
            name: exam_name
        }
        });
    
    if(!set) return res.status(404).json({ error: "No exam set found"})
    
    //create solution
    const solution = await Solution.create({
        name: student.name,
        class: student.classes,
        exam_name,
        solutions
    });

    await solution.save();

    res.status(201).json({ message: "Solutions saved successfully" });
};