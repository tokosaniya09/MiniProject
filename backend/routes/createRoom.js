const express = require("express");
const router = express.Router();
require("dotenv").config();

router.post("/", async (req, res) => {
  try {
    // Step 1: Create the room
    const roomRes = await fetch("https:/http://localhost:5000/api.100ms.live/v2/rooms", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HMS_MANAGEMENT_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: `room-${Date.now()}`,
        description: "Video call room",
        template_id: process.env.HMS_TEMPLATE_ID,
      }),
    });

    const roomData = await roomRes.json();

    if (!roomRes.ok || !roomData.id) {
      console.error("Room creation failed:", roomData);
      return res.status(500).json({
        success: false,
        message: "Failed to create 100ms room",
      });
    }

    const roomId = roomData.id;

    // Step 2: Create room codes
    const codeRes = await fetch(`https:/http://localhost:5000/api.100ms.live/v2/room-codes/room/${roomId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HMS_MANAGEMENT_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    const codeData = await codeRes.json();

    if (!codeRes.ok || !codeData.data || codeData.data.length === 0) {
      console.error("Room code creation failed:", codeData);
      return res.status(500).json({
        success: false,
        message: "Failed to create room codes",
      });
    }

    const hostCodeObj = codeData.data.find((entry) => entry.role === "host");

    if (!hostCodeObj || !hostCodeObj.code) {
      console.error("Host room code not found:", codeData);
      return res.status(500).json({
        success: false,
        message: "Host room code not found",
      });
    }

    const roomCode = hostCodeObj.code;

    return res.status(200).json({ success: true, id: roomId, roomCode });

  } catch (err) {
    console.error("API /createRoom error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
