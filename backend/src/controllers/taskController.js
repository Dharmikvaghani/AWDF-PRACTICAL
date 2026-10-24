import Task from '../models/Task.js';
import cache from '../config/cache.js';
import taskEvents from '../events/listeners.js';

// In-memory fallback if MongoDB is not running locally
let memoryTasks = [
  { _id: '1', title: 'Connect React to Express API', priority: 'high', completed: false, createdAt: new Date() },
  { _id: '2', title: 'Setup CORS and Axios Client', priority: 'medium', completed: true, createdAt: new Date() }
];

// GET /tasks with Practical 9 node-cache
export const getTasks = async (req, res, next) => {
  try {
    const userId = req.user?.id || '24cs104';
    const cacheKey = `tasks:${userId}:list`;

    // 1. Check cache first
    const cached = cache.get(cacheKey);
    if (cached) {
      return res.status(200).json({ success: true, data: cached, fromCache: true });
    }

    // 2. Query MongoDB or in-memory
    let tasks;
    try {
      tasks = await Task.find({ user: userId }).sort({ createdAt: -1 });
    } catch {
      tasks = memoryTasks;
    }

    // 3. Store in cache with 60s TTL
    cache.set(cacheKey, tasks, 60);
    res.status(200).json({ success: true, data: tasks, fromCache: false });
  } catch (err) {
    next(err);
  }
};

// POST /tasks with Practical 10 EventEmitter & cache invalidation
export const createTask = async (req, res, next) => {
  try {
    const { title, description, priority } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ success: false, error: 'Task title required' });
    }

    const userId = req.user?.id || '24cs104';
    let newTask;
    try {
      newTask = await Task.create({
        title: title.trim(),
        description: description || '',
        priority: priority || 'medium',
        user: userId
      });
    } catch {
      newTask = {
        _id: String(Date.now()),
        title: title.trim(),
        description: description || '',
        priority: priority || 'medium',
        completed: false,
        user: userId,
        createdAt: new Date()
      };
      memoryTasks.unshift(newTask);
    }

    // Practical 9: Invalidate user cache on mutation
    cache.del(`tasks:${userId}:list`);

    // Immediate HTTP 201 Response before background processing
    res.status(201).json({ success: true, data: newTask });

    // Practical 10: Asynchronous event emission decoupled from HTTP response
    taskEvents.emit('task-created', newTask);
  } catch (err) {
    next(err);
  }
};

// PUT /tasks/:id
export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id || '24cs104';

    let updated;
    try {
      updated = await Task.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    } catch {
      const idx = memoryTasks.findIndex(t => t._id === id);
      if (idx !== -1) {
        memoryTasks[idx] = { ...memoryTasks[idx], ...req.body };
        updated = memoryTasks[idx];
      }
    }

    if (!updated) {
      return res.status(404).json({ success: false, error: 'Task not found' });
    }

    // Invalidate cache
    cache.del(`tasks:${userId}:list`);
    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
};

// DELETE /tasks/:id
export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id || '24cs104';

    try {
      await Task.findByIdAndDelete(id);
    } catch {
      memoryTasks = memoryTasks.filter(t => t._id !== id);
    }

    // Invalidate cache
    cache.del(`tasks:${userId}:list`);

    res.status(200).json({ success: true, message: 'Task deleted successfully' });
    taskEvents.emit('task-deleted', id);
  } catch (err) {
    next(err);
  }
};

// GET /tasks/cache/stats (Practical 9 Telemetry)
export const getCacheStats = (req, res) => {
  res.status(200).json({
    success: true,
    stats: cache.getStats(),
    keys: cache.keys()
  });
};
