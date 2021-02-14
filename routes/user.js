const express = require("express");
const userController = require("../controllers/user");
const checkPermission = require("../middlewares/checkPermission");
const PermissionsList = require("../permissions/permissions");
const router = express.Router();

router.get(
  "/",
  checkPermission(PermissionsList.VIEW_MY_PROFILE),
  userController.getMyProfile
);
router.post(
    "/",
    checkPermission(PermissionsList.EDIT_MY_PROFILE),
    userController.getMyProfile
  );
router.get("/sellers-list",checkPermission(PermissionsList.VIEW_ALL_SELLERS), userController.getAllSellers);
router.get("/buyers-list",checkPermission(PermissionsList.VIEW_ALL_BUYERS), userController.getAllBuyers);
router.post("/my-slots",checkPermission(PermissionsList.UPDATE_MY_SLOTS), userController.updateMySlots);

module.exports.userRoutes = router;
