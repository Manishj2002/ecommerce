import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import cors from "cors";
import rateLimit from "express-rate-limit";

import connectDb from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

// ------------------------------
// Load .env (local) / Render env (production)
// ------------------------------
dotenv.config();

// Correct path
const __dirname = path.resolve();

// ------------------------------
// Connect Database
// ------------------------------
connectDb();

const app = express();
const port = process.env.PORT || 5000;

// ------------------------------
// CORS FIX (IMPORTANT)
// ------------------------------
// CORS MUST allow your frontend domain
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://shoppingstore10.netlify.app", // your frontend
    ],
    credentials: true,
  })
);

// Preflight request support
app.options("*", cors());

// ------------------------------
// Middlewares
// ------------------------------
app.use(helmet());
app.use(compression());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// ------------------------------
// Static Images Folder
// ------------------------------
app.use(
  "/uploads",
  (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    next();
  },
  express.static(path.join(__dirname, "uploads"))
);

// ------------------------------
// API Routes
// ------------------------------
app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

// PayPal config
app.get("/api/config/paypal", (req, res) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});

// ------------------------------
// Serve Frontend (Production)
// ------------------------------
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend", "dist")));
  app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

// ------------------------------
// Global Error Handler
// ------------------------------
app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err);
  res.status(500).json({
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// ------------------------------
// Start Server
// ------------------------------
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
