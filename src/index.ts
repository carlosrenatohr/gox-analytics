import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongo";
import eventRoutes from "./routes/event.routes";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", eventRoutes);

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
