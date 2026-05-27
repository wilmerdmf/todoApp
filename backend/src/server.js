require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger.config");

const { validateEnv, getConfig } = require("./config/env.config");
const { errorHandler, notFoundHandler } = require("./middlewares/errorHandler");
const projectRoutes = require("./routes/projectRoutes");
const cardRoutes = require("./routes/cardRoutes");
const authRoutes = require("./routes/authRoutes");

try {
  validateEnv();
} catch (error) {
  console.error("❌ Configuration Error:", error.message);
  process.exit(1);
}

const config = getConfig();
const app = express();

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "unpkg.com"],
        styleSrc: ["'self'", "'unsafe-inline'", "unpkg.com"],
        imgSrc: ["'self'", "data:", "unpkg.com"],
        workerSrc: ["'self'", "blob:"],
      },
    },
  }),
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: "Too many requests from this IP, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    message: "Too many authentication attempts, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api/", limiter);
app.use("/api/auth/login", authLimiter);
app.use("/api/auth/register", authLimiter);

const allowedOrigins = config.cors.origin.split(",").map((origin) => origin.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      callback(new Error(`CORS policy: origin ${origin} is not allowed`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

if (config.server.env !== "production") {
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`📚 API Docs available at http://localhost:${config.server.port}/api/docs`);
}

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Todo App API is running!",
    version: "1.0.0",
    environment: config.server.env,
    ...(config.server.env !== "production" && { docs: "/api/docs" }),
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "healthy",
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/projects", projectRoutes);
app.use("/api/cards", cardRoutes);
app.use("/api/auth", authRoutes);

app.use(notFoundHandler);

app.use(errorHandler);

mongoose
  .connect(config.mongodb.uri)
  .then(() => {
    console.log("✅ Connected to MongoDB");

    app.listen(config.server.port, () => {
      console.log(`🚀 Server running at http://localhost:${config.server.port}`);
      console.log(`🌍 Environment: ${config.server.env}`);
      console.log(`🔒 Security headers enabled`);
      console.log(`⏱️  Rate limiting enabled: 100 req/15min general, 10 req/15min auth`);
    });
  })
  .catch((error) => {
    console.error("❌ Error connecting to MongoDB:", error);
    process.exit(1);
  });

process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION! 💥 Shutting down...");
  console.error(err.name, err.message);
  process.exit(1);
});

process.on("SIGTERM", () => {
  console.log("👋 SIGTERM received. Shutting down gracefully...");
  mongoose.connection.close(() => {
    console.log("💤 MongoDB connection closed");
    process.exit(0);
  });
});
