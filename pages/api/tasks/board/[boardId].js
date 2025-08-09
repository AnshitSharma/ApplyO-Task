// pages/api/tasks/board/[boardId].js
import { withAuth, checkBoardOwnership } from '../../../../lib/middleware.js';
import { getTasksByBoardId, getBoardById } from '../../../../lib/db.js';

async function handler(req, res) {
  const { method } = req;
  const { boardId } = req.query;

  // Validate boardId
  if (!boardId) {
    return res.status(400).json({ error: 'Board ID is required' });
  }

  switch (method) {
    case 'GET':
      return await getTasksByBoard(req, res, boardId);
    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
}

// GET /api/tasks/board/[boardId] - Get all tasks for a specific board
async function getTasksByBoard(req, res, boardId) {
  try {
    // Check if board exists and user owns it
    const board = getBoardById(boardId);
    
    if (!board) {
      return res.status(404).json({ error: 'Board not found' });
    }

    // Check ownership
    checkBoardOwnership(board, req.user.id);

    // Get tasks for this board
    const tasks = getTasksByBoardId(boardId);

    res.status(200).json({ 
      tasks,
      board: {
        id: board.id,
        title: board.title,
        createdAt: board.createdAt
      }
    });

  } catch (error) {
    if (error.message.includes('Access denied')) {
      return res.status(403).json({ error: error.message });
    }
    console.error('Get tasks by board error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export default withAuth(handler);