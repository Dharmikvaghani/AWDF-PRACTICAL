import express from 'express';
import { generateDescriptionHandler } from '../controllers/aiController.js';

const router = express.Router();

router.post('/generate-description', generateDescriptionHandler);

export default router;
