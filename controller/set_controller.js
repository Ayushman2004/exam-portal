const Set = require("../model/set");


exports.create = async (req, res) => {

    if(req.user.type != "admin") return res.status(404).json({ error: "Only admins authorized"})

    //initialize set
    const { name, for_class, held_at, duration, question } = req.body;

    //create set
    const set = await Set.create({
        name,
        for_class,
        held_at,
        duration,
        question
    });

    await set.save();

    res.status(201).json({ message: "Set created successfully" });
};


exports.get = async (req, res) => {

    const { name, for_class } = req.body;
    const set = await Set.findOne({ where: { name, for_class } });

    //check user existence
    if (!set) return res.status(400).json({ error: "Invalid set" });    

    res.json({ 
        id: set.id,
        name: set.name,
        for_class: set.for_class,
        held_at: set.held_at,
        duration: set.duration,
        question: set.question
     });
};