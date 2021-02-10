const express = require("express");
const PublicController = require("../controllers/public");
const PublicRequestSchemas = require("./requestSchemas/publicRequestSchema");
const requestValidation = require("../middlewares/requestValidation")
const router = express.Router();

router.post("/register/",requestValidation(PublicRequestSchemas.register), PublicController.createNewUser);
router.post("/login/", requestValidation(PublicRequestSchemas.login),PublicController.login);

module.exports.publicRoutes = router;
