import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.js';
import agentRoutes from './routes/agents.js';
import uploadRoutes from './routes/upload.js';
import assignmentRoutes from './routes/assignments.js';
import { notFound, errorHandler } from './middleware/error.js';

dotenv.config();

if (!process.env.MONGO_URI || !process.env.JWT_SECRET || !process.env.CLIENT_URL) {
  console.error("❌ Missing required environment variables");
  process.exit(1);
}

const app = express();
app.use(express.json({ limit: '2mb' }));
app.use(morgan('dev'));

const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:5173' // keep for dev
];

app.use(cors({ origin: allowedOrigins, credentials: true }));

app.get('/', (req, res) => res.send('API is running'));

app.use('/api/auth', authRoutes);
app.use('/api/agents', agentRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/assignments', assignmentRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDB(process.env.MONGO_URI).then(() => {
  app.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`));
});
