const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");

require("dotenv").config();

const PORT = process.env.PORT || 8080;

const app = express();

connectDB();

app.use(cors());

app.use(express.json({limit: "25mb"}));

app.use("/api", require("./routes/api"));

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on("error", (err) => console.log(err));
