const express = require("express");
const PublicController = require("../controllers/public");
const fileUploader = require("express-fileupload");
const PublicRequestSchemas = require("./requestSchemas/publicRequestSchema");
const requestValidation = require("../middlewares/requestValidation");
const router = express.Router();

router.post(
  "/register/",
  requestValidation(PublicRequestSchemas.register),
  PublicController.createNewUser
);
router.post(
  "/login/",
  requestValidation(PublicRequestSchemas.login),
  PublicController.login
);
router.get( "/resources/files/:fileName",fileUploader({
  limits: { fileSize: 50 * 1024 * 1024 },
  useTempFiles: true,
  tempFileDir: "/tmp/",
  debug: true,
}),
  PublicController.getFile
);

module.exports.publicRoutes = router;
