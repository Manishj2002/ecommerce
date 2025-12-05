import express from "express";
import path from 'path';
import cookieParser from "cookie-parser";
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import connectDb from "./config/db.js";
import userRoutes from './routes/userRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

// ------------------------------
// Load env variables (local dev only)
// ------------------------------
if (process.env.NODE_ENV !== 'production') {
  import('dotenv').then(dotenv => dotenv.config());
}

// ------------------------------
// Required ENV check
// ------------------------------
if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is required");
if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is required");

const port = process.env.PORT || 5000;

// ------------------------------
// Connect DB
// ------------------------------
connectDb();

const app = express();

// ------------------------------
// Middlewares
// ------------------------------
app.use(helmet());
app.use(cors({
  origin: [
    "http://localhost:5173",                 // local dev
    "https://shoppingstore10.netlify.app"   // frontend deployed
  ],
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// ------------------------------
// Serve uploaded images
// ------------------------------
app.use('/uploads', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  next();
}, express.static(path.join(process.cwd(), 'uploads')));

// ------------------------------
// API Routes
// ------------------------------
app.use('/api/users', userRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

// PayPal config
app.get('/api/config/paypal', (req, res) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID || '' });
});

// ------------------------------
// Serve frontend in production
// ------------------------------
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(process.cwd(), 'frontend', 'dist')));
  app.get('*', (req, res) =>
    res.sendFile(path.join(process.cwd(), 'frontend', 'dist', 'index.html'))
  );
} else {
  app.get('/', (req, res) => res.send("API is running..."));
}

// ------------------------------
// Global error handler
// ------------------------------
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// ------------------------------
// Start server
// ------------------------------
app.listen(port, () => console.log(`Server running on port ${port}`));
