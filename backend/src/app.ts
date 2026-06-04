import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import path from 'path';
import { env } from './config/env';
import routes from './routes';
import { notFoundHandler, errorHandler } from './middlewares/error.middleware';
import { generalLimiter } from './middlewares/rateLimit.middleware';

const app = express();

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
app.use(generalLimiter);
app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api', routes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
