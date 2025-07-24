const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../model/student");



exports.create = async (req, res) => {

    if(req.user.type != "admin") return res.status(404).json({ error: "Only admins authorized"})

    //initialize student
    const { name, email, password, age, rollno, DOB, classes, gender } = req.body;
    //find student
    const existingStudent = await Student.findOne({ where: { email } });

    //check if student already exists
    if (existingStudent) return res.status(400).json({ error: "Student already exists" });

    //back-end field computation
    const hashedPassword = await bcrypt.hash(password, 10);

    //create student
    const student = await Student.create({
        name,
        email,
        password: hashedPassword,
        gender,
        age,
        rollno,
        DOB,
        classes
    });

    await student.save();

    res.status(201).json({ message: "Student created successfully" });
};


exports.login = async (req, res) => {

    //initialize student
    const { email, password } = req.body;
    const student = await Student.findOne({ where: { email } });

    //check student existence
    if (!student) return res.status(400).json({ error: "Invalid email or password" });
    //password-authentication
    const valid = await bcrypt.compare(password, student.password);
    if (!valid) return res.status(400).json({ error: "Invalid email or password" });

    //create jwt-token - 1hr validity
    const token = jwt.sign({ id: student.id, email: student.email, type: "student" }, process.env.HASH_KEY, { expiresIn: "1h" });

    res.json({ token });
};