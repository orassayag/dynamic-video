import Logger from '../services/logger.service.js';
import CustomError from '../custom/error.custom.js';

export default class LogMiddleware {
  constructor() {
    throw new CustomError({ message: 'Cannot create an instance of a static class' });
  }

  /**
   * Log handler middleware.
   *
   * Log each incoming request to the server.
   * @param {object} req - A request object with the body and parameters.
   * @param {object} res - A response object to return JSON.
   * @param {object} next - The next middleware function in the chain.
   * @returns {void}
   */
  static log(req, res, next) {
    const fieldsToLog = ['body', 'query', 'params', 'auth', 'headers', 'cookies'];
    const {
      method,
      originalUrl,
    } = req;
    let info = `Request: ${method} | ${originalUrl}`;
    for (let i = 0; i < fieldsToLog.length; i += 1) {
      const field = fieldsToLog[i];
      if (Object.keys(field).length) {
        info += ` | ${field}: ${JSON.stringify(req[field])}`;
      }
      info = info.trim();
    }
    Logger.info(info);
    return next();
  }
}
