const HttpCode = require("../constants/HttpCode");
const ResponseMessages = require("../constants/ResponseMessage");
const UserModel = require("../db/user/user.model");
const comparePassword = require("../utils/comparePassword");
const encryptPassword = require("../utils/encryptPassword");
const ErrorResponse = require("../utils/ErrorResponse");
const generateAuthToken = require("../utils/generateAuthToken");
const path = require("path");

async function createNewUser(req, res, next) {
  let userData = req.body;
  // const password = req.password;
  try {
    await encryptPassword(userData.password)
      .then(({ success, data }) => {
        if (success) {
          userData.password = data;
        }
      })
      .catch((e) => {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).send(e.message);
      });

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
    const userProjection = "_id email firstName lastName timeSlots userType";
    let userData = await UserModel.findByEmail(email, userProjection);

    if (!userData) {
      res.status(HttpCode.UNAUTHORIZED).send(ResponseMessages.USER_NOT_FOUND);
    } else {
      const { password: savedPassword, ...restUserData } = userData;
      if (comparePassword(password, savedPassword)) {
        const authToken = generateAuthToken(userData._id, userData.userType);
        res.status(HttpCode.OK).send({ authToken: authToken, ...restUserData });
      }
    }
  } catch (e) {
    console.log(e);
    res.status(HttpCode.INTERNAL_SERVER_ERROR);
  }
}
async function getFile(req, res) {
  try {
    let fileName = req.params.fileName;
    let filePath = path.join(
      __dirname,
      "..",
      process.env.RESOURCES_PATH,
      fileName
    );
    res.status(HttpCode.OK).sendFile(filePath);
  } catch (error) {
    console.log(error.message);
    return res
      .status(HttpCode.INTERNAL_SERVER_ERROR)
      .send(ResponseMessages.NO_DATA_FOUND);
  }
}

const PublicController = { createNewUser, login, getFile };

module.exports = PublicController;
