import express from "express";
import app from "./app.js"
const port = 3000;

app.use("/public", express.static("public"));

app.get("/", (req, res) => {
  res.send("Welcome to my REST API!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});