import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    phone: { type: String, required: true },
    notes: { type: String },
    batchId: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.model('Lead', leadSchema);
