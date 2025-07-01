const express = require("express");
const router = express.Router();
const ChatContact = require("../models/ChatContact");

// POST http://localhost:5000/api/chatContact
router.post("/", async (req, res) => {
  const { senderId, receiverId } = req.body;

  try {
    await ChatContact.findOneAndUpdate(
      { user: senderId },
      { $addToSet: { contacts: receiverId } },
      { upsert: true, new: true }
    );

    await ChatContact.findOneAndUpdate(
      { user: receiverId },
      { $addToSet: { contacts: senderId } },
      { upsert: true, new: true }
    );

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Failed to update contacts",
    });
  }
});

// GET http://localhost:5000/api/chatContact?userId=abc123
router.get("/", async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ success: false, message: "Missing userId" });
  }

  try {
    const chatContact = await ChatContact.findOne({ user: userId }).populate(
      "contacts",
      "name image _id"
    );

    return res.status(200).json({
      success: true,
      contacts: chatContact?.contacts || [],
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch contacts" });
  }
});

module.exports = router;
