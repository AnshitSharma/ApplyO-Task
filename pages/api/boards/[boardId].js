// pages/api/boards/[boardId].js
import { withAuth, checkBoardOwnership } from '../../../lib/middleware.js';
import { getBoardById, updateBoard, deleteBoard } from '../../../lib/db.js';

async function handler(req, res) {
  const { method } = req;
  const { boardId } = req.query;

  // Validate boardId
  if (!boardId) {
    return res.status(400).json({ error: 'Board ID is required' });
  }

  switch (method) {
    case 'GET':
      return await getBoard(req, res, boardId);
    case 'PUT':
      return await updateBoardHandler(req, res, boardId);
    case 'DELETE':
      return await deleteBoardHandler(req, res, boardId);
    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
}

// GET /api/boards/[boardId] - Get single board
async function getBoard(req, res, boardId) {
  try {
    const board = getBoardById(boardId);
    
    if (!board) {
      return res.status(404).json({ error: 'Board not found' });
    }

    // Check ownership
    checkBoardOwnership(board, req.user.id);

    res.status(200).json({ board });
  } catch (error) {
    if (error.message.includes('Access denied')) {
      return res.status(403).json({ error: error.message });
    }
    console.error('Get board error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// PUT /api/boards/[boardId] - Update board
async function updateBoardHandler(req, res, boardId) {
  try {
    const { title } = req.body;
    
    // Validation
    if (!title || title.trim().length === 0) {
      return res.status(400).json({ error: 'Board title is required' });
    }

    if (title.trim().length > 100) {
      return res.status(400).json({ error: 'Board title must be less than 100 characters' });
    }

    const board = getBoardById(boardId);
    
    if (!board) {
      return res.status(404).json({ error: 'Board not found' });
    }

    // Check ownership
    checkBoardOwnership(board, req.user.id);

    // Update board
    const updatedBoard = updateBoard(boardId, {
      title: title.trim()
    });

    res.status(200).json({
      message: 'Board updated successfully',
      board: updatedBoard
    });

  } catch (error) {
    if (error.message.includes('Access denied')) {
      return res.status(403).json({ error: error.message });
    }
    console.error('Update board error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// DELETE /api/boards/[boardId] - Delete board
async function deleteBoardHandler(req, res, boardId) {
  try {
    const board = getBoardById(boardId);
    
    if (!board) {
      return res.status(404).json({ error: 'Board not found' });
    }

    // Check ownership
    checkBoardOwnership(board, req.user.id);

    // Delete board (and all its tasks)
    const deleted = deleteBoard(boardId);
    
    if (!deleted) {
      return res.status(500).json({ error: 'Failed to delete board' });
    }

    res.status(200).json({ message: 'Board deleted successfully' });

  } catch (error) {
    if (error.message.includes('Access denied')) {
      return res.status(403).json({ error: error.message });
    }
    console.error('Delete board error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export default withAuth(handler);