// lib/db.js - In-memory database
import { v4 as uuidv4 } from 'uuid';

// In-memory database
let database = {
  users: [],
  boards: [],
  tasks: []
};

// User operations
export const createUser = (userData) => {
  const user = {
    id: uuidv4(),
    ...userData,
    createdAt: new Date().toISOString()
  };
  database.users.push(user);
  return user;
};

export const findUserByEmail = (email) => {
  return database.users.find(user => user.email === email);
};

export const findUserById = (id) => {
  return database.users.find(user => user.id === id);
};

// Board operations
export const createBoard = (boardData) => {
  const board = {
    id: uuidv4(),
    ...boardData,
    createdAt: new Date().toISOString()
  };
  database.boards.push(board);
  return board;
};

export const getBoardsByUserId = (userId) => {
  return database.boards.filter(board => board.userId === userId);
};

export const getBoardById = (id) => {
  return database.boards.find(board => board.id === id);
};

export const updateBoard = (id, updateData) => {
  const boardIndex = database.boards.findIndex(board => board.id === id);
  if (boardIndex === -1) return null;
  
  database.boards[boardIndex] = {
    ...database.boards[boardIndex],
    ...updateData,
    updatedAt: new Date().toISOString()
  };
  return database.boards[boardIndex];
};

export const deleteBoard = (id) => {
  const boardIndex = database.boards.findIndex(board => board.id === id);
  if (boardIndex === -1) return false;
  
  // Also delete all tasks in this board
  database.tasks = database.tasks.filter(task => task.boardId !== id);
  database.boards.splice(boardIndex, 1);
  return true;
};

// Task operations
export const createTask = (taskData) => {
  const task = {
    id: uuidv4(),
    status: 'pending',
    ...taskData,
    createdAt: new Date().toISOString()
  };
  database.tasks.push(task);
  return task;
};

export const getTasksByBoardId = (boardId) => {
  return database.tasks.filter(task => task.boardId === boardId);
};

export const getTaskById = (id) => {
  return database.tasks.find(task => task.id === id);
};

export const updateTask = (id, updateData) => {
  const taskIndex = database.tasks.findIndex(task => task.id === id);
  if (taskIndex === -1) return null;
  
  database.tasks[taskIndex] = {
    ...database.tasks[taskIndex],
    ...updateData,
    updatedAt: new Date().toISOString()
  };
  return database.tasks[taskIndex];
};

export const deleteTask = (id) => {
  const taskIndex = database.tasks.findIndex(task => task.id === id);
  if (taskIndex === -1) return false;
  
  database.tasks.splice(taskIndex, 1);
  return true;
};

// Utility function to get the entire database (for debugging)
export const getDatabase = () => database;

// Initialize with some demo data (optional)
export const initializeDatabase = () => {
  // This can be used to seed initial data if needed
  console.log('Database initialized');
};