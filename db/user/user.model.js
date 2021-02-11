const mongoose = require("mongoose");
const UserSchema = require("./user.schema");
const model = mongoose.model;

const UserModel = model("user", UserSchema);


module.exports = UserModel;
