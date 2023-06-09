const express = require("express");
const path = require("path");

const app = express();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

const port = 8010;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
