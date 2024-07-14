const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const userController = require('./Controllers/UserController');

const app = express();
app.use(express.json()); 
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));
  

  app.post('/api/users', userController.createUser);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
