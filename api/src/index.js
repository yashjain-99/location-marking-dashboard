import express from "express";
const app = express();
const port = process.env.API_PORT || 8000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
