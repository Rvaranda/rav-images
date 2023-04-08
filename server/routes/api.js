const express = require("express");
const openai = require("../config/openai");

const router = express.Router();

router.get("/image", async (req, res) => {
  const { prompt } = req.query;
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

router.post("/image/submit", (req, res) => {
  res.status(200).json({ message: "POST request received" });
});

module.exports = router;