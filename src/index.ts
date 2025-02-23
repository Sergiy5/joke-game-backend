import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import jokeRoutes from "./routes/jokeRoutes";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: [
    "http://localhost:3000", // Local development server
    "https://joke-random.vercel.app", // Vercel production URL
  ],
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type, Authorization",
};

// Middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use("/api", jokeRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

// Test Route
app.get("/", (req: any, res: any) => {
  res.send("Welcome to the Voting Game API!");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
