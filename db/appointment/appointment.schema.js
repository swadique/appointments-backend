const mongoose = require("mongoose");
const StaticMethods = require("./appointment.statics");
const InstanceMethods = require("./appointment.methods");
const AppointmentStatus = require("../../constants/AppointmentStatus");
const moment = require("moment");

const Schema = mongoose.Schema;

const AppointmentSchema = new Schema(
  {
    buyer: {type:Schema.Types.ObjectId,ref:'user'},
    seller:{type:Schema.Types.ObjectId,ref:'user'},
    slotId: String,
    startTime: String,
    endTime:String,
    appointmentDate: Date,
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
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// AppointmentSchema.virtual("endTime").get(function () {
//   return moment(this.startTime).add(this.duration,'minutes').toDate();
// });

AppointmentSchema.statics = StaticMethods;
AppointmentSchema.methods = InstanceMethods;

module.exports = AppointmentSchema;
