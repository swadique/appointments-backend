const { Mongoose } = require("mongoose");
const HttpCode = require("../constants/HttpCode");
const ResponseMessages = require("../constants/ResponseMessage");
const UserModel = require("../db/user/user.model");
const UsersList = require("../permissions/usersList");

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
async function getAllSellers(req, res, next) {
  const userId = req.userId;
  try {
    const user = await UserModel.find(
      { userType: UsersList.SELLER },
      "firstName email userType"
    ).exec();
    res.status(HttpCode.OK).send(user);
  } catch (e) {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).send(e.message);
  }
}
async function getAllBuyers(req, res, next) {
  const userId = req.userId;
  try {
    const user = await UserModel.find(
      { userType: UsersList.BUYER },
      "_id firstName lastName email userType timeSlots"
    ).exec();
    res.status(HttpCode.OK).send(user);
  } catch (e) {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).send(e.message);
  }
}
async function updateMySlots(req, res, next) {
  const userId = req.userId;
  const { timeSlots } = req.body;
  try {
    const user = await UserModel.findByIdAndUpdate(userId, {'timeSlots':timeSlots}, {
      new: true,
    }).exec();
    res.status(HttpCode.OK).send(user);
  } catch (e) {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).send(e.message);
  }
}

const userController = {
  getMyProfile,
  getAllSellers,
  getAllBuyers,
  updateMySlots,
};
module.exports = userController;
