const mongoose = require("mongoose");
const StaticMethods = require("./appointment.statics");
const InstanceMethods = require("./appointment.methods");
const AppointmentStatus = require("../../../constants/AppointmentStatus");
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
  buyerId: String,
  sellerId: String,
  slotId: String,
  startTime: Date,
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
  updated: { type: Date, default: Date.now },
});

AppointmentSchema.statics = StaticMethods;
AppointmentSchema.methods = InstanceMethods;

module.exports = AppointmentSchema;
