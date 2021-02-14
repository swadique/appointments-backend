const mongoose = require("mongoose");
const StaticMethods = require("./user.statics");
const InstanceMethods = require("./user.methods");

const Schema = mongoose.Schema;

const TimeSlotSchema = new Schema({
  slotId: { type: String, enum: [0, 1, 2, 3, 4, 5, 6] },
  day: {
    type: String,
    enum: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
  },
  status: {
    type: String,
    enum: ["enabled", "disabled"],
  },
  startTime: String,
  endTime: String,
  timeZone: String,
  duration:Number
});

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: [true, "Email required"],
  },
  userType: String,
  updated: { type: Date, default: Date.now },
  password: String,
  profilePic: String,
  timeSlots: {
    type: [TimeSlotSchema],
    default: [
      { slotId: 0, day: "sun", status: "disabled" },
      { slotId: 1, day: "mon", status: "disabled" },
      { slotId: 2, day: "tue", status: "disabled" },
      { slotId: 3, day: "wed", status: "disabled" },
      { slotId: 4, day: "thu", status: "disabled" },
      { slotId: 5, day: "fri", status: "disabled" },
      { slotId: 6, day: "sat", status: "disabled" },
    ],
  },
});
UserSchema.statics = StaticMethods;
UserSchema.methods = InstanceMethods;

module.exports = UserSchema;
