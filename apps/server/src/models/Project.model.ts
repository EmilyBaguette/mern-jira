import mongoose, { Schema } from 'mongoose';

const ProjectSchema = new Schema(
  {
    key: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export const Project = mongoose.model('Project', ProjectSchema);
