const ErrorResponse = require("../../utils/ErrorResponse");
const SuccessResponse = require("../../utils/SuccessResponse");

async function insertNewUser(
  user = {
    firstName,
    lastName,
    email,
    password,
    timeSlots,
    profilePic,
  }
) {
  try {
    const document = await this.create(user);
    return new SuccessResponse(document);
  } catch (e) {
    throw e;
  }
}

async function findByEmail(email) {
  try {
    const document = await this.findOne({ email: email }).lean();
    return document;
  } catch (e) {
    throw e;
  }
}

module.exports = { insertNewUser, findByEmail };
