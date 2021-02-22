const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


function generateAuthToken(userId, userType) {
  const token = jwt.sign({ userId, userType }, process.env.JWT_PRIVATE_KEY, {
    algorithm: "HS256",
    expiresIn: 864000,
  });
  return token;
}
function generateRecoveryAuthToken(userId, userType, expiresIn) {
  const token = jwt.sign({ userId, userType }, process.env.JWT_PRIVATE_KEY, {
    algorithm: "HS256",
    expiresIn: expiresIn, // 30 min
  });
  return token;
}

module.exports = generateAuthToken;
