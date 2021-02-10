const PermissionsList = require("./permissions");

const UserPermissions = {
  buyer: [PermissionsList.VIEW_ALL_SELLERS],
  seller: [PermissionsList.VIEW_ALL_BUYERS],
};

module.exports = UserPermissions;
