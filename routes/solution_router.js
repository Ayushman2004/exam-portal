const express = require("express");
const router = express.Router();
const auth = require("../jwt/auth");

const {
    create,
} = require("../controller/solution_controller");

router.use(auth);

router.post("/create", create);

module.exports = router;