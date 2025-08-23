import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema(
  {
    batchId: { type: String, required: true },
    agent: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent', required: true },
    leadIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lead' }]
  },
  { timestamps: true }
);

export default mongoose.model('Assignment', assignmentSchema);
