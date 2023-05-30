const { Router } = require("express");
const router = Router();
const passport = require("passport");

const { authenticateWithTwitter } = require("../controllers/auth.controller");

router.get("/auth/twitter", authenticateWithTwitter);

module.exports = router;
