import express from "express";
const app = express();
const port = 3000;

app.use("/public", express.static("public"));

app.get("/api/v1/cat", (req, res) => {
  res.json({
    cat_id: 1,
    name: "Garfield",
    birthdate: "4.20.2024",
    weight: 69,
    owner: "Jon Arbuckle",
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/b/bc/Garfield_the_Cat.svg/1200px-Garfield_the_Cat.svg.png"
  });
});

app.get("/", (req, res) => {
  res.send("Welcome to my REST API!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});