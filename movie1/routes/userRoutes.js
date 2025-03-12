// routes/userRoutes.js
const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/profile", authMiddleware, (req, res) => {
  // Assuming you have some way to fetch user data by ID
  res.json({ msg: "User Profile", userId: req.user });
});

module.exports = router;
