const express = require("express");
const router = express.Router();
const auth = require("../jwt/auth");

const {
    create,
    login,
} = require("../controller/student_controller");

router.post("/login", login);

router.use(auth);

router.post("/signup", create);

module.exports = router;