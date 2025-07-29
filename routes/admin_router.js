const express = require("express");
const router = express.Router();
const auth = require("../jwt/auth");

const {
    signup,
    login,
} = require("../controller/admin_controller");
const { grade, grade_fetch } = require("../controller/solution_controller")

router.post("/login", login);
router.post("/signup", signup);

router.use(auth);

router.post("/grade", grade)
router.post("/grade-fetch", grade_fetch)

module.exports = router;