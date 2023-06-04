import CONSTANTS from '../config/constants.config.js';
import LoggerService from '../services/logger.service.js';
import CustomError from '../custom/error.custom.js';

export default class ErrorsMiddleware {
  constructor() {
    throw new CustomError({ message: 'Cannot create an instance of a static class' });
  }

  /**
   * Error handler middleware.
   *
   * Handle default errors on any error on the express app.
   * @param {object} err - The error object that is thrown on the server.
   * @param {object} res - A response object to return JSON.
   * @param {object} next - The next middleware function in the chain.
   * @returns {void}
   */
  static ErrorHandlerMiddleware(err, req, res, next) {
    const error = err;
    // Render the error JSON.
    if (error.error && error.error.isJoi) {
      error.message = error.error.details[0].message;
      error.status = 400;
    } else if (err.message === CONSTANTS.NOT_FOUND) {
      error.status = 404;
    }
    const errorJSON = {
      status: error.status || 500,
      message: error.message,
    };
    if (error.timestamp) {
      errorJSON.timestamp = error.timestamp;
    }
    LoggerService.error(error);
    if (error.errorValue) {
      errorJSON.invalidValue = error.errorValue;
    }
    if (error.stack) {
      console.log(error.stack);
    }
    res.status(errorJSON.status).send(errorJSON);
    return next();
  }

  /**
   * Page not found handler middleware.
   *
   * Handle default errors on any error on the express app.
   * @param {object} err - The error object that is thrown on the server.
   * @param {object} res - A response object to return JSON.
   * @param {object} next - The next middleware function in the chain.
   * @returns {void}
   */
  static PageNotFoundHandlerMiddleware(req, res, next) {
    return next(new CustomError({ message: `Page not found: ${req.path} via: ${req.method}`, status: 404 }));
  }
}
