// -- Application entry point --
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongo";
import eventRoutes from "./routes/event.routes";
import statsRoutes from "./routes/stats.routes";

// -- Launch app and core config --
const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();

// -- Middlewares --
app.use(cors());
app.use(express.json());

// -- Routes --
app.use("/api/v1/event", eventRoutes);
app.use("/api/v1/stats", statsRoutes);

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
