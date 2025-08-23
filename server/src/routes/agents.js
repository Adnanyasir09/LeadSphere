import express from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import Agent from '../models/Agent.js';
import { auth } from '../middleware/auth.js';
import { isE164Phone } from '../utils/validate.js';

const router = express.Router();

// GET /api/agents (protected)
router.get('/', auth, async (req, res) => {
  const agents = await Agent.find({}).sort({ createdAt: 1 });
  res.json(agents);
});

// POST /api/agents (protected)
router.post(
  '/',
  auth,
  [
    body('name').isString().trim().notEmpty(),
    body('email').isEmail().normalizeEmail(),
    body('phone').custom((v) => isE164Phone(v)),
    body('password').isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, email, phone, password } = req.body;
    const exists = await Agent.findOne({ email: email.toLowerCase() });
    if (exists) return res.status(409).json({ message: 'Agent email already exists' });

    const hash = await bcrypt.hash(password, 10);
    const agent = await Agent.create({ name, email: email.toLowerCase(), phone, password: hash });
    res.status(201).json(agent);
  }
);

// DELETE /api/agents/:id (protected)
router.delete('/:id', auth, async (req, res) => {
  const { id } = req.params;
  await Agent.findByIdAndDelete(id);
  res.json({ message: 'Agent deleted' });
});

export default router;
