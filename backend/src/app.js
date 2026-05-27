require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");

const { errorHandler, notFoundHandler } = require("./middlewares/errorHandler");
const projectRoutes = require("./routes/projectRoutes");
const cardRoutes = require("./routes/cardRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api/", limiter);

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

app.get("/health", (req, res) => {
  res.status(200).json({ success: true, status: "healthy" });
});

app.use("/api/projects", projectRoutes);
app.use("/api/cards", cardRoutes);
app.use("/api/auth", authRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
