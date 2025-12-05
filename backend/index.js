// backend/server.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
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

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const port = process.env.PORT || 5000;

// Validate required env
if (!process.env.MONGODB_URI || !process.env.JWT_SECRET) {
  console.error("Missing MONGODB_URI or JWT_SECRET");
  process.exit(1);
}

connectDb();

const app = express();

// Security & Performance
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(compression());

// CORS
app.use(cors({
  origin: process.env.NODE_ENV === "production"
    ? "https://your-app-name.onrender.com"  // ← CHANGE THIS TO YOUR REAL RENDER URL
    : "http://localhost:3000",
  credentials: true
}));

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 200 }));

// Body parsing
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// === API ROUTES ===
app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

// PayPal
app.get("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID || "" })
);

// === SERVE FRONTEND IN PRODUCTION (RENDER) ===
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "..", "frontend", "dist"); // ← GOES UP ONE LEVEL
  
  app.use(express.static(frontendPath));

  // For any route not matching API, serve index.html
  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
} else {
  // Development
  app.get("/", (req, res) => {
    res.send(`API running on http://localhost:${port} | Development mode`);
  });
}

// Global error handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(err.status || 500).json({
    message: err.message || "Something went wrong!",
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Mode: ${process.env.NODE_ENV || "development"}`);
});