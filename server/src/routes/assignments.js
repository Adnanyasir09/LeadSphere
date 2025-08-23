import express from 'express';
import { auth } from '../middleware/auth.js';
import Assignment from '../models/Assignment.js';

const router = express.Router();

// GET /api/assignments/latest (protected) – returns latest batch grouped per agent with leads populated
router.get('/latest', auth, async (req, res) => {
  const latest = await Assignment.findOne({}).sort({ createdAt: -1 });
  if (!latest) return res.json({ batchId: null, items: [] });
  const batchId = latest.batchId;
  const items = await Assignment.find({ batchId })
    .populate('agent', 'name email phone')
    .populate('leadIds');
  res.json({ batchId, items });
});

export default router;
