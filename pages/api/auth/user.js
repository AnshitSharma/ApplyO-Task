import { verify } from 'jsonwebtoken';
import { USERS, findUserById } from '../../../lib/db';

const JWT_SECRET = process.env.JWT_SECRET;

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = verify(token, JWT_SECRET);
    const user = findUserById(decoded.userId);

    if (!user) {
      return res.status(401).json({ error: 'Invalid token. User not found.' });
    }

    const { password, ...userWithoutPassword } = user;
    res.status(200).json({ user: userWithoutPassword });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token.' });
  }
}
