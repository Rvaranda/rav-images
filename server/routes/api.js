const { v4: uuidv4 } = require("uuid");
const express = require("express");
const openai = require("../config/openai");
const Post = require("../models/Post");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

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

router.get("/images", async (req, res) => {
  res.send("hello");
});

router.post("/image/submit", async (req, res) => {
  const { user, prompt, imageData } = req.body;
  if (!user || !prompt) {
    return res.status(400).json({ message: "Username or prompt missing!" });
  }

  const s3 = new S3Client({ region: "sa-east-1" });

  const key = `RAV_${uuidv4()}_${new Date().getTime()}.png`;
  const imageUrl = `https://${process.env.BUCKET_NAME}.s3.${process.env.REGION}.amazonaws.com/${key}`;
  
  const command = new PutObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: key,
    Body: Buffer.from(imageData, "base64"),
    ContentEncoding: "base64",
    ContentType: "image/png"
  });

  try {
    const response = await s3.send(command);
    console.log(response);

    const post = await Post.create({ user, prompt, image: imageUrl });
    res.status(201).json(post);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;