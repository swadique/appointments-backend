const { Mongoose } = require("mongoose");
const HttpCode = require("../constants/HttpCode");
const ResponseMessages = require("../constants/ResponseMessage");
const UserModel = require("../db/user/user.model");

async function getMyProfile(req, res, next) {
  const userId = req.userId;
  if (!userId) {
    res.status(HttpCode.BAD_REQUEST).send(ResponseMessages.INVALID_TOKEN);
  }
  try {
    const user = await UserModel.findById(
      userId,
      "firstName email userType"
    ).exec();
    res.status(HttpCode.OK).send(user);
  } catch (e) {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).send(e.message);
  }
}

const userController = { getMyProfile };
module.exports = userController;
