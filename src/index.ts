// -- Application entry point --
import "./instrument.js";
import * as Sentry from "@sentry/node";

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongo";
import eventRoutes from "./routes/event.routes";
import statsRoutes from "./routes/stats.routes";
import authRoutes from "./routes/auth.routes";
import publicRoutes from "./routes/public.routes";
import swaggerConfig from "./config/swagger";
import swaggerUi from "swagger-ui-express";

// -- Launch app and core config --
const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();

// -- Sentry Configuration --
Sentry.setupExpressErrorHandler(app);

// Sentry.startSpan({
//   name: "My Span",
// }, () => {
//   throw new Error("My first Sentry error3!");
// });

// -- Middlewares --
app.use(cors());
app.use(express.json());

// -- Routes --
app.use("/api/v1/event", eventRoutes);
app.use("/api/v1/stats", statsRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/", publicRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerConfig));
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error2!");
});

// -- Connect to DB and start server --
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`> Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("| Error connecting to MongoDB:", err);
  });

// // Handle unhandled promise rejections
// process.on('unhandledRejection', (reason, promise) => {
//   console.error('Unhandled Rejection at:', promise, 'reason:', reason);
//   Sentry.captureException(reason);
// });

// // Handle uncaught exceptions
// process.on('uncaughtException', (error) => {
//   console.error('Uncaught Exception:', error);
//   Sentry.captureException(error);
//   process.exit(1);
// });
