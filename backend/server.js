const express = require('express');
const mongoose = require('mongoose');
const signupRoutes = require('./routes/signup');
const loginRoutes = require('./routes/login');
const verifyRoutes = require('./routes/verifyToken');
const sessionInfoRoutes = require('./routes/sessionInfo');
const deleteAccountRoutes = require('./routes/deleteAccount');
const getDataRoutes = require('./routes/getData');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config(); // Load environment variables

const app = express();
const port = process.env.PORT || 5000;


// CORS configuration to allow requests from specific origins
const corsOptions = {
  origin: 'http://localhost:5173',  // Replace this with your frontend's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200,
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests for all routes
app.options('*', cors(corsOptions));

app.use(bodyParser.json());
// Routes
app.use('/api', signupRoutes);
app.use('/api', loginRoutes);
app.use('/api', verifyRoutes);
app.use('/api', sessionInfoRoutes);
app.use('/api', deleteAccountRoutes);
app.use('/api', getDataRoutes);


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
