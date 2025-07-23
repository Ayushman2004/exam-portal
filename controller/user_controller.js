const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/user");



exports.create = async (req, res) => {

    if(req.user.type != "admin") return res.status(404).json({ error: "Only admins authorized"})

    //initialize user
    const { name, email, password, phone_number, gender } = req.body;
    //find user
    const existingUser = await User.findOne({ where: { email } });

    //check if user already exists
    if (existingUser) return res.status(400).json({ error: "User already exists" });

    //back-end field computation
    const hashedPassword = await bcrypt.hash(password, 10);
    const currentTime = new Date();
    const hashedEmail = await bcrypt.hash(email, 10);
    const base64email = Buffer.from(hashedEmail).toString("base64");

    //create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        phone_number,
        gender,
        created_at: currentTime,
        remember_token: base64email
    });

    await user.save();

    res.status(201).json({ message: "User created successfully" });
};


exports.login = async (req, res) => {

    //initialize user
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    //check user existence
    if (!user) return res.status(400).json({ error: "Invalid email or password" });
    //password-authentication
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ error: "Invalid email or password" });

    //create jwt-token - 1hr validity
    const token = jwt.sign({ id: user.id, email: user.email, type: "user" }, process.env.HASH_KEY, { expiresIn: "1h" });

    res.json({ token });
};