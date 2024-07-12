const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: '* Invalid email or password' });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: '* Invalid email or password' });
    }

    // If everything is correct, return a success message
    res.status(200).json({ message: 'Login successful'});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
