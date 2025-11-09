import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import { config } from './config';
import { errorHandler } from './middleware/error';
import authRoutes from './routes/auth.routes';
import boardRoutes from './routes/boards.routes';
import projectRoutes from './routes/projects.routes';
import ticketRoutes from './routes/tickets.routes';

const app: Express = express();

app.use(helmet());
app.use(cors({ origin: config.corsOrigin, credentials: true }));
app.use(express.json());
app.use(morgan('tiny'));

app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/boards', boardRoutes);
app.use('/api/tickets', ticketRoutes);

app.use(errorHandler);
export default app;
