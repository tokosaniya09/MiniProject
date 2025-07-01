const express = require("express");
const router = express.Router();
const { connect } = require("../dbConfig/dbConfig");
const FreeMessageQuota = require("../models/FreeMessageQuota");

connect();

// GET remaining quota
router.get("/", async (req, res) => {
  try {
    const { senderId, receiverId } = req.query;

    if (!senderId || !receiverId) {
      return res.status(400).json({
        success: false,
        error: "Missing parameters",
      });
    }

    let quota = await FreeMessageQuota.findOne({ senderId, receiverId });

    if (!quota) {
      quota = await FreeMessageQuota.create({
        senderId,
        receiverId,
        remainingMessages: 5,
      });
    }

    return res.status(200).json({
      success: true,
      remainingMessages: quota.remainingMessages,
    });
  } catch (err) {
    console.error("GET /messagesQuota error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// POST to reduce quota by 1
router.post("/", async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;

    if (!senderId || !receiverId) {
      return res.status(400).json({
        success: false,
        error: "Missing parameters",
      });
    }

    const quota = await FreeMessageQuota.findOne({ senderId, receiverId });

    if (quota && quota.remainingMessages > 0) {
      quota.remainingMessages -= 1;
      await quota.save();

      return res.status(200).json({
        success: true,
        remainingMessages: quota.remainingMessages,
      });
    } else {
      return res.status(403).json({
        success: false,
        error: "No remaining messages",
      });
    }
  } catch (err) {
    console.error("POST /messagesQuota error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
