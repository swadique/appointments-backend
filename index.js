const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const MongoClient = require("./db/MongoClient");
const { SellerRoutes } = require("./routes/seller");
const { PublicRoutes } = require("./routes/public");
const { BuyerRoutes } = require("./routes/buyer");

const app = express();
const PORT = 8001;

MongoClient.connect();
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/public", PublicRoutes);
app.use("/buyer", BuyerRoutes);
app.use("/seller", SellerRoutes);

app.listen(PORT, () => {
  console.log(`\u26a1[server]: Server is running at http://localhost:${PORT}`);
});
