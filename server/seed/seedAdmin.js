import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { connectDB } from '../src/config/db.js';
import User from '../src/models/User.js';

dotenv.config();

const run = async () => {
  try {
    const { MONGO_URI, ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
    if (!MONGO_URI) throw new Error('MONGO_URI missing');
    if (!ADMIN_NAME || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
      throw new Error('ADMIN_NAME/ADMIN_EMAIL/ADMIN_PASSWORD missing');
    }

    await connectDB(MONGO_URI);

    const existing = await User.findOne({ email: ADMIN_EMAIL.toLowerCase() });
    const hash = await bcrypt.hash(ADMIN_PASSWORD, 10);

    if (existing) {
      existing.name = ADMIN_NAME;
      existing.password = hash;
      await existing.save();
      console.log('✅ Admin updated:', ADMIN_EMAIL);
    } else {
      await User.create({
        name: ADMIN_NAME,
        email: ADMIN_EMAIL.toLowerCase(),
        password: hash,
        role: 'ADMIN'
      });
      console.log('✅ Admin created:', ADMIN_EMAIL);
    }
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err.message);
    process.exit(1);
  }
};

run();
