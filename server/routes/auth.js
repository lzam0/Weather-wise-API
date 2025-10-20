const express = require("express");
const router = express.Router();
const { postLogin } = require("../controllers/LoginController");

router.post("/login", postLogin);

module.exports = router;
