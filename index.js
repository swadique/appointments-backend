const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const MongoClient = require("./db/MongoClient");
const app = express();
const PORT = 8001;

MongoClient.connect();
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get("/", (req, res) => res.send("Express  Server"));
app.listen(PORT, () => {
  console.log(`\u26a1[server]: Server is running at http://localhost:${PORT}`);
});
