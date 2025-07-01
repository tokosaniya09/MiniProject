const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connect = require('../dbConfig/dbConfig');

// DB connection
connect();

// POST http://localhost:5000/api/users/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'User does not exist' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.TOKEN_SECRET,
      { expiresIn: '1d' }
    );

    // Send response with token cookie
    res
      .cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax',
        path: '/',
      })
      .json({
        message: 'Login Successful',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          image: user.image || '',
        },
      });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET http://localhost:5000/api/users/logout
router.get('/logout', (req, res) => {
  try {
    res
      .cookie('token', '', {
        httpOnly: true,
        expires: new Date(0),
      })
      .json({
        message: 'Logout successful',
        success: true,
      });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, image, age, gender } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      image,
      age,
      gender,
    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error('Signup Error:', err);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

// PUT http://localhost:5000/api/users/update
router.put('/update', async (req, res) => {
  try {
    const userId = await getDataFromToken(req);

    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const { name, image } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, image },
      { new: true }
    ).select('-password');

    return res.status(200).json({
      success: true,
      message: 'User updated',
      updatedUser,
    });
  } catch (error) {
    console.error('Update error:', error);
    return res.status(500).json({ success: false, message: 'Update failed' });
  }
});


module.exports = router;
