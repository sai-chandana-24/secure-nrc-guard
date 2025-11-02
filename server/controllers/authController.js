import authModel from '../models/authModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;

    const existingUser = await authModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // No change needed here. The 'role' will be set to 'public'
    // by default, according to your Mongoose schema.
    const newUser = new authModel({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error("Error in registerUser:", error);
    res.status(500).json({ error: 'Server error' });
  }
};

const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;
    const user = await authModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // [CHANGE 1] Add the user's role to the JWT payload.
    // This is crucial for authenticating future requests.
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role }, // <-- Added user.role
      process.env.JWT_SECRET, 
      { expiresIn: '2h' }
    );

    // [CHANGE 2] Create a user payload to send to the frontend.
    // This matches what your AuthContext expects in `response.data.user`.
    // We explicitly exclude the password.
    const userPayload = {
      id: user._id,
      email: user.email,
      role: user.role,
      // Add other fields from your authModel if needed
    };

    // [CHANGE 3] Send both the token AND the user object in the response.
    res.status(200).json({ 
      message: 'Login successful', 
      token,
      user: userPayload // <-- Added user object
    });

  } catch (error) {
    console.error("Error in loginUser:", error);
    res.status(500).json({ error: 'Server error' });
  }
};

export { registerUser, loginUser };
