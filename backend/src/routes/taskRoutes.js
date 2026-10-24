import express from 'express';
import { getTasks, createTask, updateTask, deleteTask, getCacheStats } from '../controllers/taskController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Public / Protected CRUD routes
router.get('/', authenticate, getTasks);
router.post('/', authenticate, createTask);
router.put('/:id', authenticate, updateTask);
router.delete('/:id', authenticate, deleteTask);

// Practical 9 Telemetry
router.get('/cache/stats', getCacheStats);

export default router;
