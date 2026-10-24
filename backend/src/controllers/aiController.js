import { generateTaskDescription } from '../services/aiService.js';

// Sliding-window rate limiter: max 10 requests per minute per user (Practical 13)
const rateLimitMap = new Map();

export async function generateDescriptionHandler(req, res, next) {
  try {
    const { title, priority } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ success: false, error: 'Title required' });
    }

    const userId = req.user?.id || req.ip || 'anonymous';
    const now = Date.now();
    const timestamps = (rateLimitMap.get(userId) || []).filter(t => now - t < 60000);

    if (timestamps.length >= 10) {
      return res.status(429).json({
        success: false,
        error: 'Rate limit exceeded: Maximum 10 AI requests per minute allowed.'
      });
    }

    timestamps.push(now);
    rateLimitMap.set(userId, timestamps);

    const result = await generateTaskDescription({ title: title.trim(), priority });

    res.status(200).json({
      success: true,
      description: result.description,
      source: result.source,
      disclaimer: 'AI-generated draft. Review and adjust before saving.'
    });
  } catch (err) {
    next(err);
  }
}
