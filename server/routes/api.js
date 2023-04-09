const express = require("express");
const openai = require("../config/openai");
const Post = require("../models/Post");
const { S3Client, PutObjectCommand, ListObjectsCommand } = require("@aws-sdk/client-s3");

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
  const s3 = new S3Client({ region: "sa-east-1" });

  const command = new ListObjectsCommand({
    Bucket: "rav-images"
  });
  
  try {
    const response = await s3.send(command);
    console.log(response);
    const urls = response.Contents.map(e => {
      let key = e.Key.replace(/\s/g, "+");
      return `https://rav-images.s3.sa-east-1.amazonaws.com/${key}`;
    });
    res.status(200).json(urls);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

router.post("/image/submit", async (req, res) => {
  const { user, prompt, imageData } = req.body;
  if (!user || !prompt) {
    return res.status(400).json({ message: "Username or prompt missing!" });
  }

  const s3 = new S3Client({ region: "sa-east-1" });

  const command = new PutObjectCommand({
    Bucket: "rav-images",
    Key: `${user}-${prompt}.png`,
    Body: Buffer.from(imageData, "base64"),
    ContentEncoding: "base64",
    ContentType: "image/png"
  });

  try {
    const response = await s3.send(command);
    console.log(response);

    // const post = await Post.create({ user, prompt, image: 'image' });
    res.status(201).json({message: "ok"});
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;