const mongoose = require("mongoose");
const StaticMethods = require("./user.statics");
const InstanceMethods = require("./user.methods");

const Schema = mongoose.Schema;

const TimeSlotSchema = new Schema({
  key: { type: String ,unique:true},
  day: String,
  startTime: String,
  endTime: String,
  timeZone: String,
});

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: [true, "Email required"],
  },
  userType: String,
  roles: {
    type: [String],
  },
  updated: { type: Date, default: Date.now },
  password: String,
  profilePic: String,
  timeSlots: [TimeSlotSchema],
});
UserSchema.statics = StaticMethods;
UserSchema.methods = InstanceMethods;

module.exports = UserSchema;
