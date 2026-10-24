import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const generateToken = (userId, email) => {
  const secret = process.env.JWT_SECRET || 'awdf_secret_key_24cs104';
  return jwt.sign({ id: userId, email, studentId: '24CS104' }, secret, { expiresIn: '7d' });
};

export const register = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email and password required' });
    }

    let user;
    try {
      user = await User.create({ email, password, name, studentId: '24CS104' });
    } catch (err) {
      return res.status(400).json({ success: false, error: err.message });
    }

    const token = generateToken(user._id, user.email);
    res.status(201).json({
      success: true,
      token,
      user: { id: user._id, email: user.email, name: user.name, studentId: user.studentId }
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email and password required' });
    }

    let user;
    try {
      user = await User.findOne({ email });
    } catch {
      // Allow demo user
      if (email === '24cs104@charusat.edu.in') {
        const token = generateToken('6a87c104', email);
        return res.status(200).json({
          success: true,
          token,
          user: { id: '6a87c104', email, studentId: '24CS104', name: 'Dharmik Vaghani' }
        });
      }
    }

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, error: 'Invalid email or password' });
    }

    const token = generateToken(user._id, user.email);
    res.status(200).json({
      success: true,
      token,
      user: { id: user._id, email: user.email, name: user.name, studentId: user.studentId }
    });
  } catch (err) {
    next(err);
  }
};

export const getMe = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user
  });
};
