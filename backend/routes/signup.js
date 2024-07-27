const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const UserSessions = require('../models/userSessions');
const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const {
      email,
      password,
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
      numberOfChildren,
      emergencyContact,
      isAnxious = '',
      anxietySeverity = '',
      anxietySymptoms = {},
      isDepressed = '',
      depressionSeverity = '',
      depressionSymptoms = {}
    } = req.body;


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
      numberOfChildren,
      emergencyContact,
      isAnxious,
      anxietySeverity,
      anxietySymptoms: typeof anxietySymptoms === 'string' ? JSON.parse(anxietySymptoms) : anxietySymptoms,
      isDepressed,
      depressionSeverity,
      depressionSymptoms: typeof depressionSymptoms === 'string' ? JSON.parse(depressionSymptoms) : depressionSymptoms
    });

    await newUser.save();

    // Create a new session for the user
    const newUserSession = new UserSessions({
      userId: newUser._id,
      nSessions: 0,
      nextSessionDate: null,
      mainProblem: '',
      sessions: {}
    });

    await newUserSession.save();

    res.status(201).json({ message: 'User and session created successfully' });
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
