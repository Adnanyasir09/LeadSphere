import express from 'express';
import multer from 'multer';
import path from 'path';
import { auth } from '../middleware/auth.js';
import { parseLeadsFile } from '../utils/parseUpload.js';
import Agent from '../models/Agent.js';
import Lead from '../models/Lead.js';
import Assignment from '../models/Assignment.js';

const router = express.Router();

// Multer in-memory storage, filter for csv/xlsx/xls/axls
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase().replace('.', '');
    const allowedExt = ['csv', 'xlsx', 'xls', 'axls'];
    if (!allowedExt.includes(ext)) return cb(new Error('Only csv, xlsx, xls (axls) files are allowed'));
    cb(null, true);
  },
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

// POST /api/upload (protected) -> distribute equally among EXACTLY 5 agents
router.post('/', auth, upload.single('file'), async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const ext = path.extname(req.file.originalname).toLowerCase().replace('.', '');
    const rows = parseLeadsFile(req.file.buffer, ext);
    if (!rows.length) return res.status(400).json({ message: 'No valid rows found (need FirstName & Phone)' });

    const agents = await Agent.find({ active: true }).sort({ createdAt: 1 }).limit(5);
    if (agents.length !== 5) {
      return res.status(400).json({ message: 'Exactly 5 active agents required to distribute' });
    }

    const batchId = `${Date.now()}`; // unique batch

    // Create leads first
    const createdLeads = await Lead.insertMany(
      rows.map((r) => ({ firstName: r.firstName, phone: r.phone, notes: r.notes, batchId }))
    );

    // Distribute round-robin (sequential leftovers handled naturally)
    const buckets = agents.map(() => []);
    createdLeads.forEach((lead, idx) => {
      const bucketIdx = idx % 5; // 0..4
      buckets[bucketIdx].push(lead._id);
    });

    // Create assignments
    const assignments = [];
    for (let i = 0; i < 5; i++) {
      assignments.push({ batchId, agent: agents[i]._id, leadIds: buckets[i] });
    }
    await Assignment.insertMany(assignments);

    // Response summary
    const summary = assignments.map((a, i) => ({
      agent: { id: agents[i]._id, name: agents[i].name, email: agents[i].email },
      count: a.leadIds.length
    }));

    res.status(201).json({ batchId, total: createdLeads.length, summary });
  } catch (err) {
    next(err);
  }
});

export default router;
