const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Assuming this is the user model
const UserSession = require('../models/userSessions'); // Assuming this is the userSession model

const router = express.Router();

// Replace with your secret key
const JWT_SECRET = 'your_jwt_secret';

// Middleware to verify token and extract user info
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization').split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

router.delete('/delete-account', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId; // Retrieve userId from decoded token

    // Delete the user from the users collection
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Delete all sessions associated with this user from the userSessions collection
    await UserSession.deleteMany({ userId: userId });

    res.status(200).json({ message: 'Account and associated sessions successfully deleted.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
