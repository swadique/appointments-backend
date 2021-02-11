const PermissionsList = require("./permissions");
const UsersList = require("./usersList");
const UserPermissions = {
  [UsersList.BUYER]: [
    PermissionsList.VIEW_ALL_SELLERS,
    PermissionsList.VIEW_MY_PROFILE,
  ],
  [UsersList.SELLER]: [
    PermissionsList.VIEW_ALL_BUYERS,
    PermissionsList.VIEW_MY_PROFILE,
  ],
};

module.exports = UserPermissions;
