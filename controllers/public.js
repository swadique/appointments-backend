const HttpCode = require("../constants/HttpCode");
const ResponseMessages = require("../constants/ResponseMessage");
const UserModel = require("../db/user/user.model");
const comparePassword = require("../utils/comparePassword");
const encryptPassword = require("../utils/encryptPassword");
const ErrorResponse = require("../utils/ErrorResponse");
const generateAuthToken = require("../utils/generateAuthToken");
const SuccessResponse = require("../utils/SuccessResponse");
async function createNewUser(req, res, next) {
  const userData = req.body;
  if (userData.password) {
    await encryptPassword(userData.password)
      .then(({ success, data }) => {
        if (success) {
          userData.password = data;
        }
      })
      .catch((e) => {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).send(e.message);
      });
  }
  await UserModel.insertNewUser(userData)
    .then((response) => {
      res.status(HttpCode.OK).send(SuccessResponse(response));
    })
    .catch((e) => {
      res.status(HttpCode.INTERNAL_SERVER_ERROR).send(e);
    });
}
async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    let userData = await UserModel.findByEmail(email);
    if (!userData) {
      res
        .status(HttpCode.UNAUTHORIZED)
        .send(new ErrorResponse(ResponseMessages.USER_NOT_FOUND));
    } else {
      if (comparePassword(password, userData.password)) {
        const authToken = generateAuthToken(userData._id, userData.userType);
        res
          .status(HttpCode.OK)
          .send(new SuccessResponse({ authToken: authToken }));
      }
    }
  } catch (e) {
    res
      .status(HttpCode.INTERNAL_SERVER_ERROR)
      .send(new ErrorResponse(e.message));
  }
}

const PublicController = { createNewUser, login };

module.exports = PublicController;
