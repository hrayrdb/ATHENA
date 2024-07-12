const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const { email, password, name, yearOfBirth, educationLevel, occupation, workingHoursPerDay, momPassed, dadPassed, parentsDivorced, numberOfSiblings, relationshipStatus, numberOfChildren } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with all the information
    const newUser = new User({
      email,
      password: hashedPassword,
      name,
      yearOfBirth,
      educationLevel,
      occupation,
      workingHoursPerDay,
      momPassed,
      dadPassed,
      parentsDivorced,
      numberOfSiblings,
      relationshipStatus,
      numberOfChildren
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;


router.post('/check-email', async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already exists' });
    }
    res.status(200).json({ message: 'Email is available' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
