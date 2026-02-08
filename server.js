import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
app.set("timeout", 0); // disable timeout
dotenv.config();

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
