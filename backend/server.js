const express = require('express');
const mongoose = require('mongoose');
const signupRoutes = require('./routes/signup');
const loginRoutes = require('./routes/login');
const verifyRoutes = require('./routes/verifyToken');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config(); // Load environment variables

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', signupRoutes);
app.use('/api', loginRoutes); 
app.use('/api', verifyRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });
