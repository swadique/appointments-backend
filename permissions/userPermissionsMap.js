const PermissionsList = require("./permissions");
const UsersList = require("./usersList");
const UserPermissions = {
  [UsersList.BUYER]: [
    PermissionsList.VIEW_ALL_SELLERS,
    PermissionsList.VIEW_MY_PROFILE,
    PermissionsList.CREATE_APPOINTMENTS,
    PermissionsList.VIEW_AVAILABLE_INTERVALS,
    PermissionsList.UPDATE_MY_PROFILE_PICTURE,
    PermissionsList.EDIT_MY_PROFILE,
    PermissionsList.VIEW_MY_APPOINTMENTS,
  ],
  [UsersList.SELLER]: [
    PermissionsList.VIEW_ALL_BUYERS,
    PermissionsList.VIEW_MY_PROFILE,
    PermissionsList.UPDATE_MY_SLOTS,
    PermissionsList.UPDATE_MY_PROFILE_PICTURE,
    PermissionsList.EDIT_MY_PROFILE,
    PermissionsList.VIEW_MY_APPOINTMENTS,
  ],
};

module.exports = UserPermissions;
