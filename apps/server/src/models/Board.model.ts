import mongoose, { Schema } from 'mongoose';

const ColumnSchema = new Schema({
  title: String,
  order: Number,
  width: Number,
});

const BoardSchema = new Schema(
  {
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    columns: [ColumnSchema],
  },
  { timestamps: true }
);

export const Board = mongoose.model('Board', BoardSchema);
