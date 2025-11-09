import { z } from 'zod';

export const TicketCreateSchema = z.object({
  projectId: z.string(),
  boardId: z.string(),
  title: z.string().min(1),
  description: z.string().optional(),
  status: z.enum(['todo', 'inprogress', 'done']).default('todo'),
  order: z.number().int().nonnegative().default(0),
  assigneeId: z.string().optional(),
  points: z.number().int().positive().optional(),
});

export const TicketUpdateSchema = TicketCreateSchema.partial();

export const AuthLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type TicketCreateInput = z.infer<typeof TicketCreateSchema>;
export type TicketUpdateInput = z.infer<typeof TicketUpdateSchema>;
export type AuthLoginInput = z.infer<typeof AuthLoginSchema>;
