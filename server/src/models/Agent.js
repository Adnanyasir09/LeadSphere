import mongoose from 'mongoose';

const agentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String, required: true }, // E.164 like +911234567890
    password: { type: String, required: true }, // hashed
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model('Agent', agentSchema);
