const express = require("express");
const userController = require("../controllers/user");
const checkPermission = require("../middlewares/checkPermission");
const PermissionsList = require("../permissions/permissions");
const router = express.Router();

router.get("/",checkPermission(PermissionsList.VIEW_ALL_BUYERS), userController.getMyProfile);
// router.get("/sellers-list", userController.getAllSellers);
// router.get("/buyers-list", userController.getAllBuyers);


module.exports.userRoutes = router;
