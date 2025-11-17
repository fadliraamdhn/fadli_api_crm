import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("CRM API running with Bun + Express");
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
