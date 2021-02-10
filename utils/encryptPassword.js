const bcrypt = require("bcrypt");
const ErrorResponse = require("./ErrorResponse");
const SuccessResponse = require("./SuccessResponse");

async function encryptPassword(password) {
  try {
    const salt = await bcrypt.genSalt(10);
    return new Promise((res, rej) => {
      bcrypt.hash(password, salt, (error, encrypted) => {
        if (error) {
          rej(new ErrorResponse(error));
        } else {
          res(new SuccessResponse(encrypted));
        }
      });
    });
  } catch (error) {
    return new ErrorResponse(error);
  }
}
module.exports = encryptPassword;
