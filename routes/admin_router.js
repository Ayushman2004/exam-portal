const express = require("express");
const router = express.Router();
const auth = require("../jwt/auth");

const {
    signup,
    login,
} = require("../controller/admin_controller");

router.post("/login", login);
router.post("/signup", signup);

module.exports = router;