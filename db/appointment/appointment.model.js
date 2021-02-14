const mongoose = require("mongoose");
const AppointmentSchema = require("./appointment.schema");
const model = mongoose.model;

const AppointmentModel = model("appointment", AppointmentSchema);

module.exports = AppointmentModel;
