import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// --------------------
// MongoDB Connection
// --------------------
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Error:", error.message);
    process.exit(1);
  }
}
connectDB();

// --------------------
// Contact Route Import
// --------------------
import contactRoutes from "./routes/contactRoutes.js";
app.use("/api/contact", contactRoutes);

// --------------------
// Root Test Route
// --------------------
app.get("/", (req, res) => {
  res.send("Backend working fine");
});

// --------------------
// Start Server
// --------------------
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
