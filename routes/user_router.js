const express = require("express");
const router = express.Router();
const auth = require("../jwt/auth");

const {
    create,
    login,
} = require("../controller/user_controller");

router.post("/login", login);

router.use(auth);

router.post("/signup", create);

module.exports = router;