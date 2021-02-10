const HttpCode = require("../constants/HttpCode");
const ResponseMessages = require("../constants/ResponseMessage");
const UserPermissions = require("../permissions/userPermissionsMap");

function checkPermission(permission) {
  return (req, res, next) => {
    const userType = req.userType;
    const hasPermission = UserPermissions[userType].includes(permission);
    if (!hasPermission) {
      res
        .status(HttpCode.UNAUTHORIZED)
        .send(ResponseMessages.PERMISSION_DENIED);
    }
    next();
  };
}

module.exports = checkPermission;
