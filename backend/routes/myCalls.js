const express = require("express");
const router = express.Router();
const { connect } = require("../dbConfig/dbConfig");
const Call = require("../models/call");

connect();

// GET http://localhost:5000/api/getCalls?userId=xyz
router.get("/", async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }

    const allCalls = await Call.find({
      $or: [{ userId }, { volunteerId: userId }],
    })
      .populate({
        path: "userId",
        model: "User",
        select: "name image",
      })
      .populate({
        path: "volunteerId",
        model: "User",
        select: "name image",
      });

    const userCalls = [];
    const volunteerCalls = [];

    for (const call of allCalls) {
      if (call.volunteerId?._id.toString() === userId) {
        volunteerCalls.push(call);
      } else if (call.userId?._id.toString() === userId) {
        userCalls.push(call);
      }
    }

    return res.status(200).json({ success: true, userCalls, volunteerCalls });
  } catch (error) {
    console.error("Error fetching calls:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
