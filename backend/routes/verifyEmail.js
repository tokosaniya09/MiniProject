const express = require('express');
const router = express.Router();
const EmailVerification = require('../models/EmailVerification'); // adjust path if needed
const nodemailer = require('nodemailer');

// POST http://localhost:5000/api/verifyEmail/sendCode
router.post('/sendCode', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email required' });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await EmailVerification.deleteMany({ email });
    await EmailVerification.create({ email, code });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Email Verification Code',
      text: `Your verification code is: ${code}`,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error sending verification code:', error);
    return res.status(500).json({ success: false });
  }
});

// POST http://localhost:5000/api/verifyEmail/validateCode
router.post('/validateCode', async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({ verified: false, message: 'Missing email or code' });
    }

    const record = await EmailVerification.findOne({ email, code });

    if (!record) {
      return res.status(200).json({ verified: false });
    }

    // Delete the code after successful validation
    await EmailVerification.deleteMany({ email });

    return res.status(200).json({ verified: true });
  } catch (err) {
    console.error('Verification failed:', err);
    return res.status(500).json({ verified: false });
  }
});


module.exports = router;
