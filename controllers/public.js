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
  const password = req.password;
  try {
    if (password) {
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

    const isEmailFound = await UserModel.findByEmail(userData.email);
    if (!isEmailFound) {
      const updatedUser = await UserModel.insertNewUser(userData);
      if (updatedUser) {
        res.status(HttpCode.CREATED).send(ResponseMessages.ACCOUNT_CREATED);
      }
    } else {
      res.status(HttpCode.CONFLICT).send(ResponseMessages.EMAIL_ALREADY_EXIST);
    }
  } catch (e) {
    console.log(e);
    res.status(HttpCode.INTERNAL_SERVER_ERROR).send(e.message);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    let userData = await UserModel.findByEmail(email);
    if (!userData) {
      res.status(HttpCode.UNAUTHORIZED).send(ResponseMessages.USER_NOT_FOUND);
    } else {
      if (comparePassword(password, userData.password)) {
        const authToken = generateAuthToken(userData._id, userData.userType);
        res.status(HttpCode.OK).send({ authToken: authToken });
      }
    }
  } catch (e) {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).send(e.message);
  }
}

const PublicController = { createNewUser, login };

module.exports = PublicController;
