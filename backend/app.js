const express = require('express');
const cors = require('cors');
const connectToDb = require("./config/connectDB");
const authRoute = require('./routes/authRoute');
const eventRoute = require('./routes/eventsRoute')
require("dotenv").config();

const app = express();
connectToDb();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Routes
app.use("/api/auth", authRoute);
app.use("/api/events", eventRoute);

// Test route (optional)
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
