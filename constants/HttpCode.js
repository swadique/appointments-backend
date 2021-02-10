const HttpCode = {
  // Success
  OK: 200,
  CREATED: 201,
  UPDATED:204,

  // Client Errors
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT : 409,

  //Failure
  INTERNAL_SERVER_ERROR: 500,
};

module.exports = HttpCode;
