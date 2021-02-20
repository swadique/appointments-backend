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
      "firstName lastName email userType timeSlots profilePic isAllSlotsActive"
    ).exec();
    res.status(HttpCode.OK).send(user);
  } catch (e) {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).send(e.message);
  }
}
async function updateMyProfile(req, res, next) {
  const userId = req.userId;
  const userData = req.body;
  if (!userId) {
    res.status(HttpCode.BAD_REQUEST).send(ResponseMessages.INVALID_TOKEN);
  }
  try {
    const user = await UserModel.findByIdAndUpdate(userId, userData, {}).exec();
    res.status(HttpCode.UPDATED).send(ResponseMessages.UPDATE_SUCCESSFULLY);
  } catch (e) {
    console.log(e.message)
    res.status(HttpCode.INTERNAL_SERVER_ERROR).send(ResponseMessages.FAILED_OPERATION);
  }
}
async function getAllSellers(req, res, next) {
  const userId = req.userId;
  try {
    const user = await UserModel.find(
      { userType: UsersList.SELLER },
      "firstName email userType timeSlots profilePic "
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
      "_id firstName lastName email userType profilePic"
    ).exec();
    res.status(HttpCode.OK).send(user);
  } catch (e) {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).send(e.message);
  }
}
async function updateMySlots(req, res, next) {
  const userId = req.userId;
  const { timeSlots, isAllSlotsActive } = req.body;
  try {
    const user = await UserModel.findByIdAndUpdate(
      userId,
      { timeSlots, isAllSlotsActive },
      {
        new: true,
      }
    ).exec();
    res.status(HttpCode.OK).send(user);
  } catch (e) {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).send(e.message);
  }
}
async function updateProfilePicture(req, res, next) {
  try {
    profilePic = req.files.profilePic;
    const { userId } = req;
    const timeNow = Date.now();
    const fileName = `${
      process.env.RESOURCES_PATH
    }pro-pic-${userId}-${timeNow}-${profilePic.name.trim()}`;
    const filterQuery = { _id: userId };
    const updateQuery = { profilePic: fileName };
    profilePic.mv(`${fileName}`, async (err) => {
      if (err) {
        throw err;
      } else {
        const { ok } = await UserModel.updateOne(filterQuery, updateQuery);
        if (!ok) {
          throw new Error(ResponseMessages.DB_UPDATION_FAILED);
        }
        res.status(HttpCode.OK).send(ResponseMessages.PROFILE_PIC_UPDATED);
      }
    });
  } catch (e) {
    console.log(e.message)
    res
      .status(HttpCode.INTERNAL_SERVER_ERROR)
      .send(ResponseMessages.PROFILE_PIC_NOT_UPDATED);
  }
}

const userController = {
  getMyProfile,
  getAllSellers,
  getAllBuyers,
  updateMySlots,
  updateProfilePicture,
  updateMyProfile,
};
module.exports = userController;
