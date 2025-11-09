import mongoose, { Schema } from 'mongoose';

const TicketSchema = new Schema(
  {
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    boardId: { type: Schema.Types.ObjectId, ref: 'Board', required: true },
    title: { type: String, required: true },
    description: String,
    status: { type: String, enum: ['todo', 'inprogress', 'done'], default: 'todo' },
    order: { type: Number, default: 0 },
    assigneeId: { type: Schema.Types.ObjectId, ref: 'User' },
    points: Number,
  },
  { timestamps: true }
);

export const Ticket = mongoose.model('Ticket', TicketSchema);
