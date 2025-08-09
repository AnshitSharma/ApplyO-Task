// pages/api/boards/index.js
import { withAuth } from '../../../lib/middleware.js';
import { createBoard, getBoardsByUserId } from '../../../lib/db.js';

async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      return await getBoards(req, res);
    case 'POST':
      return await createNewBoard(req, res);
    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
}

// GET /api/boards - Get all boards for authenticated user
async function getBoards(req, res) {
  try {
    const boards = getBoardsByUserId(req.user.id);
    res.status(200).json({ boards });
  } catch (error) {
    console.error('Get boards error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// POST /api/boards - Create new board
async function createNewBoard(req, res) {
  try {
    const { title } = req.body;

    // Validation
    if (!title || title.trim().length === 0) {
      return res.status(400).json({ error: 'Board title is required' });
    }

    if (title.trim().length > 100) {
      return res.status(400).json({ error: 'Board title must be less than 100 characters' });
    }

    // Create board
    const board = createBoard({
      userId: req.user.id,
      title: title.trim()
    });

    res.status(201).json({
      message: 'Board created successfully',
      board
    });

  } catch (error) {
    console.error('Create board error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export default withAuth(handler);