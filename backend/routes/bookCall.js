import express from 'express';
const router = express.Router();
const Call = require("../models/call");
const connectDB = require("../dbConfig/dbConfig");
const { createRoom } = require("../utils/createHMSRoom");

router.post("/", async (req, res) => {
  try {
    await connectDB();

    const { userId, volunteerId, time, duration } = req.body;

    const startTime = new Date(time);
    const endTime = new Date(startTime.getTime() + duration * 60000);

    const overlappingCall = await Call.findOne({
      volunteerId,
      time: { $lt: endTime },
      $expr: {
        $gt: [
          { $add: ["$time", { $multiply: ["$duration", 60000] }] },
          startTime,
        ],
      },
      status: { $in: ["pending", "confirmed"] },
    });

    if (overlappingCall) {
      return res.status(409).json({
        success: false,
        message:
          "Volunteer is already booked at this time. Please choose another time.",
      });
    }

    const roomUrl = await createRoom();

    if (!roomUrl) {
      return res.status(500).json({
        success: false,
        message: "Failed to create room URL",
      });
    }

    const newCall = await Call.create({
      userId,
      volunteerId,
      time: startTime,
      duration,
      roomUrl,
    });

    // Trigger notification
    await fetch(`${process.env.FRONTEND_URL}/api/registerCall`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        volunteerId,
        time: startTime,
        duration,
        roomUrl,
      }),
    });

    return res.status(200).json({ success: true, call: newCall });
  } catch (err) {
    console.error("API Error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Server error occurred" });
  }
});

export default router;
