const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const User = require("../models/User");
const Volunteer = require("../models/Volunteer");
const connectDB = require("../dbConfig/dbConfig");

connectDB();

router.post("/", async (req, res) => {
  try {
    const { userId, volunteerId, time, duration, roomUrl } = req.body;

    const user = await User.findById(userId);
    const volunteer = await Volunteer.findOne({ userId: volunteerId }).populate("userId");

    if (!user || !volunteer) {
      return res.status(404).json({ success: false, message: "User or volunteer not found" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const formattedTime = new Date(time).toLocaleString();

    const emailContent = (receiverName, partnerName) => `
Hi ${receiverName},

Your video call with ${partnerName} has been successfully scheduled.

🕒 Time: ${formattedTime}
⏱ Duration: ${duration} minutes
🔗 Join the scheduled call on time directly from the website!

Please be on time and click the above link when the call is about to start.

Warm regards,  
Brighter Beyond Team
    `;

    // Send email to user
    await transporter.sendMail({
      from: `"Brighter Beyond" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Your Video Call is Scheduled",
      text: emailContent(user.name, volunteer.userId.name, roomUrl),
    });

    // Send email to volunteer
    await transporter.sendMail({
      from: `"Brighter Beyond" <${process.env.EMAIL_USER}>`,
      to: volunteer.userId.email,
      subject: "A User Has Scheduled a Call with You",
      text: emailContent(volunteer.userId.name, user.name, roomUrl),
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Email sending error:", err);
    return res.status(500).json({ success: false, message: "Failed to send email notifications" });
  }
});

module.exports = router;
