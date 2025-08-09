// pages/api/tasks/index.js
import { withAuth, checkBoardOwnership } from '../../../lib/middleware.js';
import { createTask, getBoardById } from '../../../lib/db.js';

async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'POST':
      return await createNewTask(req, res);
    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
}

// POST /api/tasks - Create new task
async function createNewTask(req, res) {
  try {
    const { boardId, title, description, dueDate } = req.body;

    // Validation
    if (!boardId) {
      return res.status(400).json({ error: 'Board ID is required' });
    }

    if (!title || title.trim().length === 0) {
      return res.status(400).json({ error: 'Task title is required' });
    }

    if (title.trim().length > 200) {
      return res.status(400).json({ error: 'Task title must be less than 200 characters' });
    }

    if (description && description.length > 1000) {
      return res.status(400).json({ error: 'Task description must be less than 1000 characters' });
    }

    // Check if board exists and user owns it
    const board = getBoardById(boardId);
    if (!board) {
      return res.status(404).json({ error: 'Board not found' });
    }

    checkBoardOwnership(board, req.user.id);

    // Validate due date if provided
    let validDueDate = null;
    if (dueDate) {
      validDueDate = new Date(dueDate);
      if (isNaN(validDueDate.getTime())) {
        return res.status(400).json({ error: 'Invalid due date format' });
      }
      validDueDate = validDueDate.toISOString();
    }

    // Create task
    const task = createTask({
      boardId,
      title: title.trim(),
      description: description ? description.trim() : '',
      dueDate: validDueDate
    });

    res.status(201).json({
      message: 'Task created successfully',
      task
    });

  } catch (error) {
    if (error.message.includes('Access denied')) {
      return res.status(403).json({ error: error.message });
    }
    console.error('Create task error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export default withAuth(handler);