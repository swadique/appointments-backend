const bcrypt = require("bcrypt");

async function comparePassword(password1, password2) {
  const isEqual = await bcrypt.compare(password1, password2);
  return isEqual;
}

module.exports = comparePassword;
