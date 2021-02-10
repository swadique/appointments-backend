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
  return new Promise((resolve, reject) => {
    try {
      this.create(user, function (error, document) {
        if (error) {
          if (error.name === "MongoError" && error.code === 11000) {
            reject(new ErrorResponse("Email already exists"));
          } else {
            reject(new ErrorResponse(error.message));
          }
        } else {
          resolve(new SuccessResponse(document));
        }
      });
    } catch (e) {
      reject(new ErrorResponse(e.message));
    }
  });
}
async function authenticateEmailAndPassword(email, password) {
  return new Promise((resolve, reject) => {
    try {
      this.findOne({ email: email }, function (error, document) {
        if (error) {
          reject(new ErrorResponse(error.message));
        } else {
          resolve(new SuccessResponse(document));
        }
      });
    } catch (e) {
      reject(new ErrorResponse(e.message));
    }
  });
}

async function findByEmail(email) {
  const document = await this.findOne({email:email}).lean();
  return document;
}
async function updateAuthToken(userId, authToken) {
  const user = await this.findOneAndUpdate(
    { _id: userId },
    { authToken: authToken }
  ).lean();
  return user;
}

module.exports = { insertNewUser, findByEmail, updateAuthToken };
