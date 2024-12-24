const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = 'super-secret-key'

// REGISTER
//POST REGISTER
// REGISTER
// POST REGISTER
const signup = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Hash password and create new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error signing up' });
  }
};


//GET Registered Users
const register = async (req, res, next) => {
  try {
    const users = await User.find()
    res.status(201).json(users)

  } catch (error) {
    res.status(500).json({ error: 'Unable to get users' })
  }
}

//LOGIN

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1hr' });
    res.json({ message: 'Login successful', token }); // Return token
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
}


exports.register = register;
exports.signup = signup;
exports.login = login;














