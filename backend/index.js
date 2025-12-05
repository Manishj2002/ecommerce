// backend/server.js  ← FINAL WORKING VERSION (2025)
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

// Fix __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const port = process.env.PORT || 5000;

// Validate env
if (!process.env.MONGODB_URI || !process.env.JWT_SECRET) {
  console.error("Missing MONGODB_URI or JWT_SECRET");
  process.exit(1);
}

connectDb();

const app = express();

// Security & Performance
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(compression());
app.use(cors({
  origin: process.env.NODE_ENV === "production"
    ? "https://your-app.onrender.com"  // ← change to your real URL later
    : "http://localhost:3000",
  credentials: true
}));

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 200 }));

// Body parsing — ONLY JSON & URLENCODED (formidable is used only in upload route)
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// === ROUTES ===
app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);   // ← formidable() is inside this file only

// PayPal
app.get("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

// PRODUCTION: Serve frontend
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "frontend", "dist");
  app.use(express.static(frontendPath));
  app.get("*", (req, res) =>
    res.sendFile(path.join(frontendPath, "index.html"))
  );
} else {
  app.get("/", (req, res) =>
    res.send(`API running on http://localhost:${port}`)
  );
}

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Server Error" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});