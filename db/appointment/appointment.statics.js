const ErrorResponse = require("../../utils/ErrorResponse");
const SuccessResponse = require("../../utils/SuccessResponse");

async function createNewAppointment(
  buyerId,sellerId,time,duration
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


module.exports = { insertNewUser, findByEmail };
