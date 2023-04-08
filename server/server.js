const express = require("express");
const openai = require("./config/openai");
const cors = require("cors");

const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api", require("./routes/api"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
