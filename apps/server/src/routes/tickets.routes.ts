import { Router } from 'express';

import { Ticket } from '../models/Ticket.model';
import { TicketCreateSchema, TicketUpdateSchema } from '../zod';

const router: Router = Router();

router.get('/', async (_req, res) => {
  const tickets = await Ticket.find().sort({ order: 1 });
  res.json(tickets);
});

router.post('/', async (req, res) => {
  const input = TicketCreateSchema.parse(req.body);
  const created = await Ticket.create(input);
  res.status(201).json(created);
});

router.patch('/:id', async (req, res) => {
  const input = TicketUpdateSchema.parse(req.body);
  const updated = await Ticket.findByIdAndUpdate(req.params.id, input, {
    new: true,
  });
  res.json(updated);
});

router.delete('/:id', async (req, res) => {
  await Ticket.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

export default router;
