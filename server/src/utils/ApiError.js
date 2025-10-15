class ApiError extends Error {
  constructor(statusCode, message, success = false, error = [], stack = "") {
    super(message);
    this.statusCode = statusCode;
    sucess = false,
    error = [],
    this.stack = stack;

    if (stack) {
      stack = this.stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;