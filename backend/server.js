const express = require("express");
if (process.env.NODE_ENV !== "development") {
  require("dotenv").config();
}
const connectDB = require("./config/db");
const cors = require("cors");
const { errorHandler } = require("./middleware/errorMiddleware");

const port = process.env.PORT || 5000; // Elastic Beanstalk sets process.env.PORT

// Connect to the MongoDB database
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

//ROUTES
const userRoute = require("./routes/userRoute");
const eventRoute = require("./routes/eventRoute");

// Middleware to handle and catch errors
app.use(errorHandler);

//ROUTES NAME
app.use("/user", userRoute);
app.use("/event", eventRoute);

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
