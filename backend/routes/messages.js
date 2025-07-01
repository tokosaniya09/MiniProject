const express = require("express");
const router = express.Router();
const { connect } = require("../dbConfig/dbConfig");
const Message = require("../models/Message");

connect();

// POST: Create a new message
router.post("/", async (req, res) => {
  try {
    const { senderId, receiverId, text } = req.body;

    if (!senderId || !receiverId || !text) {
      return res.status(400).json({ success: false, error: "Missing fields" });
    }

    const newMessage = await Message.create({ senderId, receiverId, text });

    return res.status(201).json({ success: true, message: newMessage });
  } catch (err) {
    console.error("POST /messages error:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// GET: Fetch all messages between two users
router.get("/", async (req, res) => {
  try {
    const { senderId, receiverId } = req.query;

    if (!senderId || !receiverId) {
      return res.status(400).json({ success: false, error: "Missing parameters" });
    }

    const messages = await Message.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId }
      ]
    }).sort({ createdAt: 1 });

    return res.status(200).json({ success: true, messages });
  } catch (err) {
    console.error("GET /messages error:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
