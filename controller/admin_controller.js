const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../model/admin");



exports.signup = async (req, res) => {

    //initialize admin
    const { name, email, password, phone_number, gender } = req.body;
    //find admin
    const existingAdmin = await Admin.findOne({ where: { email } });

    //check if user already exists
    if (existingAdmin) return res.status(400).json({ error: "Admin already exists" });

    //back-end field computation
    const hashedPassword = await bcrypt.hash(password, 10);
    const currentTime = new Date();
    const hashedEmail = await bcrypt.hash(email, 10);
    const base64email = Buffer.from(hashedEmail).toString("base64");

    //create admin
    const admin = await Admin.create({
        name,
        email,
        password: hashedPassword,
        phone_number,
        gender,
        created_at: currentTime,
        remember_token: base64email
    });

    await admin.save();

    res.status(201).json({ message: "Admin created successfully" });
};


exports.login = async (req, res) => {

    //initialize admin
    const { email, password } = req.body;
    const admin = await Admin.findOne({ where: { email } });

    //check user existence
    if (!admin) return res.status(400).json({ error: "Invalid email or password" });
    //password-authentication
    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) return res.status(400).json({ error: "Invalid email or password" });

    //create jwt-token - 1hr validity
    const token = jwt.sign({ id: admin.id, email: admin.email, type: "admin" }, process.env.HASH_KEY, { expiresIn: "1h" });

    res.json({ token });
};