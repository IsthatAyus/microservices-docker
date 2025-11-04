const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Auth Service is running 🚀");
});

app.listen(PORT, () => {
  console.log(`Auth Service running on port ${PORT}`);
});
