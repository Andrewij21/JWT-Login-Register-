const jwtTokens = require("./jwt-helpers");
const requestResponse = {
  success: {
    status: 200,
    message: "Success.",
  },
  incomplete_body: {
    status: 400,
    message: "Bad request. Please check your request data.",
  },
  unauthorized: {
    status: 401,
    message:
      "E-mail or password does not match, or you are not authorized to accessing this page.",
  },
  forbidden: {
    status: 403,
    message: "access to the requested resource is forbidden.",
  },
  not_found: {
    status: 404,
    message: "Resource not found",
  },
  unprocessable_entity: {
    status: 422,
    message: "The request you sent is unable to process",
  },
  conflict: {
    status: 409,
    message:
      "The request could not be completed due to a conflict with the current state of the resource",
  },
  server_error: {
    status: 500,
    message: "Internal server error. Please contact the administrator.",
  },
};

module.exports = { requestResponse, jwtTokens };
