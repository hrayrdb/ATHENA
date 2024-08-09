const express = require('express');
const router = express.Router();
const UserSessions = require('../models/userSessions');

// Endpoint to get session info based on user ID
router.get('/session-info', async (req, res) => {
  const userId = req.query.user_id;
  try {
    const userSessions = await UserSessions.findOne({ userId });
    if (userSessions) {
      res.json({ n_sessions: userSessions.nSessions });
    } else {
      res.status(404).json({ message: 'User sessions not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
