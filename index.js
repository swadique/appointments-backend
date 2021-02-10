const express = require("express");
const cors = require("cors");
require("dotenv").config();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const MongoClient = require("./db/MongoClient");
const { sellerRoutes } = require("./routes/seller");
const { publicRoutes } = require("./routes/public");
const { buyerRoutes } = require("./routes/buyer");
const UserModel = require("./db/user/user.model");
const { getMaxListeners } = require("./db/user/user.model");
const authMiddleWare = require("./middlewares/authMiddleWare");
const app = express();
const PORT = 8001;
MongoClient.connect();
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/public", publicRoutes);
app.use("/buyer", authMiddleWare, buyerRoutes);
app.use("/seller", sellerRoutes);

app.listen(PORT, () => {
  console.log(`\u26a1[server]: Server is running at http://localhost:${PORT}`);
});
