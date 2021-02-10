const roleList = require("./data");

const userPolicies = new Map([
  [
    "WORKSHOP_OWNER",
    ["CREATE_NEW_USER", "GET_WORKSHOPS", "ADD_WORKSHOPS", "RESET_PASSWORD"],
  ],
  ["VEHICLE_OWNER", ["CREATE_NEW_USER", "RESET_PASSWORD", "ADD_VEHICLE"]],
]);
const initializeDb = () => {
  initializeRoles(roleList);
};
const initializeRoles = (roles = []) => {
  UserRoleModel.findOne({}, (err, doc) => {
    if (err) {
      console.log(err);
    } else if (doc) {
      console.log("Roles are already initialized");
    } else {
      roles.map((item) =>
        UserRoleModel.create(
          {
            role: item,
          },
          (error) => {
            if (error) {
              console.log(error);
            }
          }
        )
      );
    }
  });
};
