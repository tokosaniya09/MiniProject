const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('../utils/cloudinary');

// Use memory storage so we can convert to base64
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No image provided' });
    }

    const base64Image = file.buffer.toString('base64');
    const dataURI = `data:${file.mimetype};base64,${base64Image}`;

    const uploadResponse = await cloudinary.uploader.upload(dataURI, {
      folder: 'profile_pictures',
    });

    return res.json({ imageUrl: uploadResponse.secure_url });
  } catch (error) {
    console.error('Upload error: ', error);
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
