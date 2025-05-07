const asyncHandler = require("express-async-handler");
const  bcrypt = require('bcryptjs');
const  User = require("../models/User");
const jwt = require('jsonwebtoken');



// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
  
    // Check if all fields are provided
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide name, email, and password' });
    }
  
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
  
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
  
    // Create the user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
  
    if (user) {
      res.status(201).json({message: 'User created successfully, please login'});
    } else {
      res.status(500).json({ message: 'User creation failed' });
    }
});



// @desc    Login a user
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    // Check for missing fields
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }
  
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  
    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  
    // Generate JWT
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
  
    // Send response
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token,
    });
});

module.exports = {
  registerUser,
  loginUser
}