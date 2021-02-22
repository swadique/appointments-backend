const mongoose = require("mongoose");
const AppointmentModel = require("../db/appointment/appointment.model");
const MongoClient = require("../db/MongoClient");
const UserModel = require("../db/user/user.model");
MongoClient.connect();
async function testfunction1() {
  
  try {
    const result = await AppointmentModel.find({
      _id: "6029ef4f1136c2cd6200e15e",
    }).populate("sellerId");
    console.log(result);
  } catch (e) {
    console.log(e);
  }
}
async function testfunction2() {
  try {
    const result = await AppointmentModel.createNewAppointment({
      sellerId: mongoose.Types.ObjectId("602963223c147887182e8036"),
      slotId: "0",
      startTime: "2021-02-14T17:58:08.529Z",
      duration: "60",
    });
    console.log(result);
  } catch (e) {
    console.log(e);
  }
}
testfunction1();
