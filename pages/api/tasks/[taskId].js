// pages/api/tasks/[taskId].js
import { withAuth, checkTaskOwnership } from '../../../lib/middleware.js';
import { getTaskById, updateTask, deleteTask, getBoardById } from '../../../lib/db.js';

async function handler(req, res) {
  const { method } = req;
  const { taskId } = req.query;

  // Validate taskId
  if (!taskId) {
    return res.status(400).json({ error: 'Task ID is required' });
  }

  switch (method) {
    case 'GET':
      return await getTask(req, res, taskId);
    case 'PUT':
      return await updateTaskHandler(req, res, taskId);
    case 'DELETE':
      return await deleteTaskHandler(req, res, taskId);
    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
}

// GET /api/tasks/[taskId] - Get single task
async function getTask(req, res, taskId) {
  try {
    const task = getTaskById(taskId);
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Check ownership through board
    const board = getBoardById(task.boardId);
    checkTaskOwnership(task, board, req.user.id);

    res.status(200).json({ task });
  } catch (error) {
    if (error.message.includes('Access denied')) {
      return res.status(403).json({ error: error.message });
    }
    console.error('Get task error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// PUT /api/tasks/[taskId] - Update task
async function updateTaskHandler(req, res, taskId) {
  try {
    const { title, description, status, dueDate } = req.body;
    
    const task = getTaskById(taskId);
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Check ownership
    const board = getBoardById(task.boardId);
    checkTaskOwnership(task, board, req.user.id);

    // Build update object
    const updateData = {};

    // Validate and set title
    if (title !== undefined) {
      if (!title || title.trim().length === 0) {
        return res.status(400).json({ error: 'Task title cannot be empty' });
      }
      if (title.trim().length > 200) {
        return res.status(400).json({ error: 'Task title must be less than 200 characters' });
      }
      updateData.title = title.trim();
    }

    // Validate and set description
    if (description !== undefined) {
      if (description && description.length > 1000) {
        return res.status(400).json({ error: 'Task description must be less than 1000 characters' });
      }
      updateData.description = description ? description.trim() : '';
    }

    // Validate and set status
    if (status !== undefined) {
      if (!['pending', 'completed'].includes(status)) {
        return res.status(400).json({ error: 'Status must be either "pending" or "completed"' });
      }
      updateData.status = status;
    }

    // Validate and set due date
    if (dueDate !== undefined) {
      if (dueDate === null || dueDate === '') {
        updateData.dueDate = null;
      } else {
        const validDueDate = new Date(dueDate);
        if (isNaN(validDueDate.getTime())) {
          return res.status(400).json({ error: 'Invalid due date format' });
        }
        updateData.dueDate = validDueDate.toISOString();
      }
    }

    // Update task
    const updatedTask = updateTask(taskId, updateData);

    res.status(200).json({
      message: 'Task updated successfully',
      task: updatedTask
    });

  } catch (error) {
    if (error.message.includes('Access denied')) {
      return res.status(403).json({ error: error.message });
    }
    console.error('Update task error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// DELETE /api/tasks/[taskId] - Delete task
async function deleteTaskHandler(req, res, taskId) {
  try {
    const task = getTaskById(taskId);
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Check ownership
    const board = getBoardById(task.boardId);
    checkTaskOwnership(task, board, req.user.id);

    // Delete task
    const deleted = deleteTask(taskId);
    
    if (!deleted) {
      return res.status(500).json({ error: 'Failed to delete task' });
    }

    res.status(200).json({ message: 'Task deleted successfully' });

  } catch (error) {
    if (error.message.includes('Access denied')) {
      return res.status(403).json({ error: error.message });
    }
    console.error('Delete task error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export default withAuth(handler);