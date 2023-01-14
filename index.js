const express = require("express");
const app = express();
const port = process.env.PORT || 7000;
const cors = require("cors");
require("dotenv").config();

// MedalWare
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("foodfly server is open");
});

app.listen(port, () => {
  console.log(`foodfly server port:${port}`);
});
