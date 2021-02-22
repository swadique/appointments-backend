const express = require("express");
const cors = require("cors");
require("dotenv").config();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const MongoClient = require("./db/MongoClient");
const { appointmentsRoutes } = require("./routes/appointments");
const { publicRoutes } = require("./routes/public");
const authMiddleWare = require("./middlewares/authMiddleWare");
const { userRoutes } = require("./routes/user");

const app = express();
const PORT = process.env.PORT;

MongoClient.connect();

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/public", publicRoutes);
app.use("/user", authMiddleWare, userRoutes);
app.use("/appointment", authMiddleWare, appointmentsRoutes);

app.listen(PORT, () => {
  console.log(`\u26a1[server]: Server is running at http://localhost:${PORT}`);
});
