const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Adjust path based on your structure
const connect = require('../dbConfig/dbConfig');

// Ensure DB connection
connect();

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    return res.json({
      success: true,
      message: 'User found',
      user,
    });
  } catch (error) {
    console.error('❌ Error fetching user:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching user',
      error: error.message,
    });
  }
});

module.exports = router;
