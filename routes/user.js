const express = require("express");
const userController = require("../controllers/user");
const checkPermission = require("../middlewares/checkPermission");
const PermissionsList = require("../permissions/permissions");
const fileUploader = require("express-fileupload")
const router = express.Router();

router.get(
  "/",
  checkPermission(PermissionsList.VIEW_MY_PROFILE),
  userController.getMyProfile
);
router.post(
  "/",
  checkPermission(PermissionsList.EDIT_MY_PROFILE),
  userController.updateMyProfile
);
router.get(
  "/sellers-list",
  checkPermission(PermissionsList.VIEW_ALL_SELLERS),
  userController.getAllSellers
);
router.get(
  "/buyers-list",
  checkPermission(PermissionsList.VIEW_ALL_BUYERS),
  userController.getAllBuyers
);
router.post(
  "/my-slots",
  checkPermission(PermissionsList.UPDATE_MY_SLOTS),
  userController.updateMySlots
);
router.post(
  "/profile-pic",
  fileUploader({
    limits: { fileSize: 50 * 1024 * 1024 },
    useTempFiles: true,
    tempFileDir: "/tmp/",
    debug: true,
  }),
  checkPermission(PermissionsList.UPDATE_MY_PROFILE_PICTURE),
  userController.updateProfilePicture
);

module.exports.userRoutes = router;
