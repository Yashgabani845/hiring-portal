const User = require('../models/User'); // Import the User model

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role, profileDetails } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required.' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email.' });
    }
    const newUser = new User({
      name,
      email,
      password,
      role,
      profileDetails
    });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully.', user: newUser });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message });
  }
};
