// lib/middleware.js - Authentication middleware
import { verifyToken, getTokenFromCookies } from './auth.js';
import { findUserById } from './db.js';

// Authenticate user middleware
export const authenticate = async (req, res, next) => {
  try {
    const token = getTokenFromCookies(req);
    
    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    const decoded = verifyToken(token);
    const user = findUserById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid token. User not found.' });
    }

    // Add user to request object
    req.user = {
      id: user.id,
      email: user.email
    };

    if (next) {
      next();
    }
    return true;
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token.' });
  }
};

// Wrapper for API routes that require authentication
export const withAuth = (handler) => {
  return async (req, res) => {
    const authResult = await authenticate(req, res);
    if (authResult === true) {
      return handler(req, res);
    }
    // If authenticate returns false, it has already sent the error response
  };
};

// Authorization helper - check if user owns resource
export const checkBoardOwnership = (board, userId) => {
  if (!board) {
    throw new Error('Board not found');
  }
  if (board.userId !== userId) {
    throw new Error('Access denied. You can only access your own boards.');
  }
  return true;
};

export const checkTaskOwnership = (task, board, userId) => {
  if (!task) {
    throw new Error('Task not found');
  }
  if (!board) {
    throw new Error('Board not found');
  }
  if (board.userId !== userId) {
    throw new Error('Access denied. You can only access tasks from your own boards.');
  }
  return true;
};