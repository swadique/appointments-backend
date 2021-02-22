const MongoClient = require("../db/MongoClient");
const appointmentsHelper = require("../helper/appointmentsHelper");
MongoClient.connect("mongodb://localhost:27017/AppointmentsDb");

function slotsTest(params) {
  const fun1 = appointmentsHelper.getAvailableSlots(
    "602963223c147887182e8036",
    "0",
    "2021-02-14T17:58:08.529"
  );
}
slotsTest();
