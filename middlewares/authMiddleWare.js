const Jwt = require("jsonwebtoken");
const ResponseMessages = require("../constants/ResponseMessage");
function authMiddleWare(req, res, next) {
  try {
    const bearerToken =
      req.headers["x-access-token"] || req.headers["authorization"];
    const token = bearerToken.split(" ")[1];
    if (!token) return res.status(401).send(ResponseMessages.TOKEN_NOT_PRESENT);

    const { userType, userId } = Jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    if (userId) {
      req.userId = userId;
    }
    if (userType) {
      req.userType = userType;
    }
    next();
  } catch (e) {
    res.status(400).send("Invalid token");
  }
}

module.exports = authMiddleWare;
