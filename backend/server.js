const express = require("express");
const cors = require("cors");

const travelRoutes = require("./routes/travelRoutes");
const { connectDB } = require("./config/db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Travel Plan Routes
app.use("/api/travel-plans", travelRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Travel Planner Backend is running!");
});

// Start server
const PORT = 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
  });