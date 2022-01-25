// external imports
const express = require("express");

// internal imports
const { getLoginView } = require("../controllers/loginController");

const router = express.Router();

// login page
router.get("/", getLoginView);

module.exports = router;
