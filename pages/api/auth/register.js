// pages/api/auth/register.js
import { hashPassword, generateToken, isValidEmail, isValidPassword, getCookieOptions } from '../../../lib/auth.js';
import { createUser, findUserByEmail } from '../../../lib/db.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Please provide a valid email address' });
    }

    if (!isValidPassword(password)) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    // Check if user already exists
    const existingUser = findUserByEmail(email.toLowerCase());
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Hash password and create user
    const hashedPassword = await hashPassword(password);
    const user = createUser({
      email: email.toLowerCase(),
      password: hashedPassword
    });

    // Generate JWT token
    const token = generateToken({ userId: user.id });

    // Set HTTP-only cookie
    res.setHeader('Set-Cookie', `token=${token}; ${Object.entries(getCookieOptions()).map(([key, value]) => `${key}=${value}`).join('; ')}`);

    // Return user data (without password)
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}