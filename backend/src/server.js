import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { requestLogger } from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';
import taskRoutes from './routes/taskRoutes.js';
import authRoutes from './routes/authRoutes.js';
import aiRoutes from './routes/aiRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Global Middleware Pipeline - Practical 4
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(requestLogger);

// API Endpoints
app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);

// Root Healthcheck
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'ONLINE',
    author: 'Dharmik Vaghani',
    studentId: '24CS104',
    subject: 'ITUE301: Advanced Web Development Frameworks',
    version: '1.0.0'
  });
});

// Centralized Error Handling Middleware
app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running in development mode on http://localhost:${PORT}`);
    console.log(`Mounted routes: /api/tasks (GET, POST, PUT, DELETE), /api/auth, /api/ai`);
  });
}

export default app;
