const express = require('express');
const cors = require('cors');
const connectToDb = require("./config/connectDB");
const authRoute = require('./routes/authRoute');
const eventRoute = require('./routes/eventsRoute')
const bookRoute = require('./routes/bookRoute');
const {errorHandler} = require("./middleware/error");
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
app.use("/api/book", bookRoute);

app.use(errorHandler);

// Test route (optional)
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
