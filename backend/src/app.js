import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import authRoutes from './routes/auth.js';
import profileRoutes from './routes/profile.js';
import transactionRoutes from './routes/transactions.js';
import budgetRoutes from './routes/budgets.js';
import analyticsRoutes from './routes/analytics.js';
import reportRoutes from './routes/reports.js';
import notificationRoutes from './routes/notifications.js';
import aiRoutes from './routes/ai.js';
import errorHandler from './middlewares/errorHandler.js';
const app = express();
app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '12mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(morgan('tiny'));
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 90,
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(limiter);
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/budgets', budgetRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/ai', aiRoutes);
app.use(errorHandler);
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', environment: process.env.NODE_ENV ?? 'development' });
});
export default app;
