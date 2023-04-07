const express = require("express");
const openai = require("./config/openai");
const cors = require("cors");

const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors());

app.use(express.json());

app.post("/api/image", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ message: "Please enter a prompt." });
  }

  try {
    const response = await openai.createImage({
      prompt,
      response_format: "b64_json",
    });
    res.status(200).json(response.data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
