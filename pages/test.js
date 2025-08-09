// pages/api/test.js - Simple API test endpoint
import { getDatabase } from '../lib/db.js';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const db = getDatabase();
    
    res.status(200).json({
      message: 'TaskBoard API is working!',
      timestamp: new Date().toISOString(),
      database: {
        users: db.users.length,
        boards: db.boards.length,
        tasks: db.tasks.length
      },
      endpoints: {
        auth: [
          'POST /api/auth/register',
          'POST /api/auth/login',
          'POST /api/auth/logout'
        ],
        boards: [
          'GET /api/boards',
          'POST /api/boards',
          'GET /api/boards/[boardId]',
          'PUT /api/boards/[boardId]',
          'DELETE /api/boards/[boardId]'
        ],
        tasks: [
          'POST /api/tasks',
          'GET /api/tasks/[taskId]',
          'PUT /api/tasks/[taskId]',
          'DELETE /api/tasks/[taskId]',
          'GET /api/tasks/board/[boardId]'
        ]
      }
    });
  } catch (error) {
    console.error('Test API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}