const mongoose = require("mongoose");
const StaticMethods = require("./appointment.statics");
const InstanceMethods = require("../db/appointment/appointment.methods");
const AppointmentStatus = require("../../../constants/AppointmentStatus");
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
  buyer: String,
  seller: String,
  slotId: String,
  startTime: String,
  duration: String,
  status: {
    type: String,
    default: AppointmentStatus.PENDING,
    enum: [
      AppointmentStatus.ACCEPTED,
      AppointmentStatus.PENDING,
      AppointmentStatus.REJECTED,
    ],
  },
});
AppointmentSchema.statics = StaticMethods;
AppointmentSchema.methods = InstanceMethods;

module.exports = AppointmentSchema;
