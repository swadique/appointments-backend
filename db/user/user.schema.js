const mongoose = require("mongoose");
const StaticMethods = require("./user.statics");
const InstanceMethods = require("./user.methods");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: [true, "Email required"],
    unique: true,
  },
  userType:String,
  roles: {
    type: [String],
  },
  updated: { type: Date, default: Date.now },
  password: String,
  profilePic: String,
  timeSlots: [String],
  authToken: String,
});
UserSchema.statics = StaticMethods;
UserSchema.methods = InstanceMethods;

module.exports = UserSchema;
