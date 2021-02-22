const mongoose = require("mongoose");
let database = mongoose.connection;
const MONGODB_URI = process.env.MONGODB_URI
class MongoClient {
  static async connect() {
    mongoose
      .connect(MONGODB_URI, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex: true,
      })
      .catch((e) => console.log(e.message));

    database.once("open", () => {
      console.log("Database connected");
    });
    database.on("error", (error) => {
      console.log("Database error:", error);
    });
  }

  static disconnect() {
    mongoose
      .disconnect()
      .then((value) => console.log("Disconnected"))
      .catch((error) => console.log("Disconnection failed", error));
  }
}
module.exports = MongoClient;
