// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import staffRoutes from "./routes/staffRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Root
app.get("/", (req, res) => {
  res.send("Maanagaram Discord Backend is Running 🚀");
});

// Staff Routes
app.use("/api/staff", staffRoutes);

// Start Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
  console.log(`🚀 Backend running on port ${PORT}`)
);