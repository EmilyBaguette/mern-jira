import cors from 'cors';
import express, { type Express } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import { config } from './config';
import { errorHandler } from './middleware/error';
import boardRoutes from './routes/boards.routes';
import projectRoutes from './routes/projects.routes';
import ticketRoutes from './routes/tickets.routes';

const app: Express = express();

app.use(helmet());
app.use(
  cors({
    origin: config.corsOrigin, // e.g. "http://localhost:5173"
    credentials: false, // you're not using cookies right now
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type'], // add "Authorization" later if you re-enable header auth
    optionsSuccessStatus: 204,
  })
);
app.use(express.json());
app.use(morgan('tiny'));

app.get('/api/health', (_req, res) => res.json({ ok: true }));
// app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/boards', boardRoutes);
app.use('/api/tickets', ticketRoutes);

app.use(errorHandler);
export default app;
