const express = require('express');
const router = express.Router();
const multer = require('multer');
const Car = require('../models/carModel.js');

// Configure multer for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname) 
  }
});
const upload = multer({ storage: storage });

router.post('/save', upload.array('images', 10), async (req, res) => {
  try {
    const { brand, model, color, power, year, transmission, price, location, coupe, from, fuelType, kilometres, engineCapacity, euroStatus, doorsCount, contact, description, ownerId } = req.body;

    const images = req.files.map(file => file.path); // Get file paths for images

    const newCar = new Car({
      brand, model, color, power, year, transmission, price, location, coupe, from, fuelType, kilometres, engineCapacity, euroStatus, doorsCount, contact, description, ownerId,
      images: images
    });

    await newCar.save();
    res.status(201).json(newCar);
  } catch (error) {
    console.error('Error saving car:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
