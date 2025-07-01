const express = require('express');
const router = express.Router();
const Volunteer = require('../models/volunteer');
const User = require('../models/User');
const problemCategories = require('../data/groups');

// GET http://localhost:5000/api/volunteer/:slug
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const userId = req.query.userId;

    const matchedCategory = problemCategories.find(cat => cat.slug === slug);
    const problemTitle = matchedCategory?.title || slug.replace(/-/g, " ");

    if (!problemTitle) {
      return res.status(400).json({ success: false, error: "Problem title is missing" });
    }

    const query = {
      problem: { $in: [problemTitle] }
    };

    if (userId) {
      query.userId = { $ne: userId };
    }

    const volunteers = await Volunteer.find(query)
      .populate("userId", "name image age");

    return res.status(200).json({ success: true, volunteers });
  } catch (error) {
    console.error("Error fetching volunteers:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
});


// GET http://localhost:5000/api/volunteer/me
router.get('/me', async (req, res) => {
  try {
    const userId = getDataFromToken(req); // Extract from cookie or Authorization header

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const volunteer = await Volunteer.findOne({ userId }).populate("userId", "name email image");

    if (!volunteer) {
      return res.status(404).json({ success: false, message: "Volunteer not found" });
    }

    return res.status(200).json({ success: true, volunteer });
  } catch (error) {
    console.error("Error in /volunteer/me:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
});


// POST http://localhost:5000/api/volunteer/register
router.post('/register', async (req, res) => {
  try {
    const data = req.body;

    const existing = await Volunteer.findOne({ userId: data.userId });
    if (existing) {
      return res.status(400).json({ error: "Volunteer already exists" });
    }

    const newVolunteer = new Volunteer({
      userId: data.userId,
      description: data.description,
      problem: data.problem,
    });

    await newVolunteer.save();

    return res.status(200).json({ message: "Volunteer registered successfully" });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ error: "Failed to register volunteer" });
  }
});

module.exports = router;
