const mongoose = require("mongoose");
let database = mongoose.connection;
class MongoClient {
  static connect() {
    try {
      mongoose.connect("mongodb://localhost:27017/AppointmentsDb", {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      });
    } catch (error) {
      console.log("Database connection error:", error);
    }
    database.once("open", () => {
      console.log("Database connected");
    });
    database.on("error", () => {
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
