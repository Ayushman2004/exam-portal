const express = require("express");
const router = express.Router();
const auth = require("../jwt/auth");

const {
    create,
    get,
} = require("../controller/set_controller");

router.post("/get", get);

router.use(auth);

router.post("/create", create);

module.exports = router;