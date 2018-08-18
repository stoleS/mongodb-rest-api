const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const mongoURI = require("./config/keys").mongoURI;
const bodyParser = require("body-parser");

// Connect to database
mongoose
  .connect(
    mongoURI,
    { useNewUrlParser: true }
  )
  .then(() => console.log("Connected to database..."))
  .catch(err => console.log(err));

// Define app
const app = express();

// Routes
const users = require("./routes/users");
const cars = require("./routes/cars");

// Middleware
app.use(logger("dev"));
app.use(bodyParser.json());

// Routes
app.use("/users", users);
app.use("/cars", cars);

// Catch Errors
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Error handler function
app.use((err, req, res, next) => {
  const error = app.get("end") === "development" ? err : {};
  const status = err.status || 500;

  // Respond to client
  res.status(status).json({
    error: {
      message: error.message
    }
  });

  // Respond to terminal
  console.error(err);
});

// Start the server
const port = app.get("port") || 3000;
app.listen(port, () => console.log(`Server is listening on port ${port}`));
