const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();
const errorHandler = require("./middlewares/errorHandler");
const sequelize = require("./config/database");

// Import database models for synchronization
require("./modules/product/dbmodels/");
require("./modules/users/dbmodules/");
require("./modules/categories/dbmodels/");
require("./modules/orders/dbmodels/");
require("./modules/reviews/dbmodels/");
require("./modules/addresses/dbmodels/");
require("./modules/coupons/dbmodels/");
require("./modules/filterOptions/dbmodels/");

// Import all routes
const authRoutes = require("./modules/auth/routes");
const productModuleRoutes = require("./modules/product/routes");
const userRoutes = require("./modules/users/routes");
const orderRoutes = require("./modules/orders/routes");
const addressRoutes = require("./modules/addresses/routes");
const filterOptionRoutes = require("./modules/filterOptions/routes");
const uploadRoutes = require("./modules/upload/routes");

const app = express();
const base_url = process.env.API_BASE_URL || "/api/v1";
const allowedOrigins = process.env.CORS_ORIGIN?.split(",") || [
  "http://localhost:3000",
  "http://localhost:3001",
];

// Security Middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
}));

// CORS Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Body Parsing Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Request logging in development
if (process.env.NODE_ENV === "development") {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
  });
}

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Laptop Refurbished API is running",
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use(base_url, authRoutes);
app.use(base_url, productModuleRoutes);
app.use(base_url, userRoutes);
app.use(base_url, orderRoutes);
app.use(base_url, addressRoutes);
app.use(base_url, filterOptionRoutes);
app.use(base_url, uploadRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found",
    path: req.originalUrl,
  });
});

// Error Handler
app.use(errorHandler);

// Sequelize Sync
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("✅ Database Synced successfully");
  })
  .catch((err) => {
    console.error("❌ Error syncing Database:", err.message);
  });

// Server Start
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`✅ API Base URL: ${base_url}`);
  console.log(`✅ Environment: ${process.env.NODE_ENV || "development"}`);
});
