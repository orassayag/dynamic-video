import axios from 'axios';
import CONSTANTS from '../config/constants.config.js';
import CustomError from '../custom/error.custom.js';
import LoggerService from '../services/logger.service.js';

export default class NetworksUtils {
  constructor() {
    throw new CustomError({ message: 'Cannot create an instance of a static class' });
  }

  /**
   * Send a request.
   *
   * This function gets the request options and performs a send request operation. If successful,
   * return the data (If exists). If failed, log all the details and throw an error.
   * @param options - The axios sends request options (Headers, request type, etc).
   * @return {object}
   */
  static async sendRequest({
    url,
    method,
    isDevMode,
    payload = null,
  }) {
    const options = {
      url,
      method,
      data: payload,
      headers: {
        Accept: 'application/json',
        Authorization: CONSTANTS.DATA.AUTH,
        'Content-Type': 'application/json',
      },
    };
    if (isDevMode) {
      options.headers['x-idomoo-api-mode'] = 'developer';
    }
    let data = null;
    try {
      const response = await axios(options);
      switch (response.status) {
        case 200: case 201:
          data = response.data;
          break;
        default:
          throw new Error(response);
      }
    } catch (error) {
      this.handleRequestError(error, options);
    }
    return data;
  }

  /**
    * Handle request error.
    *
    * This function gets the request's error and options and manipulate to fetch the exact needed
    * error data according to different objects returned from the original response.
    * @param error - The server's error object.
    * @param options - The axios sends request options (Headers, request type, etc).
    * @return {object}
    */
  static handleRequestError(error, options) {
    LoggerService.error(`Send request failed: ${error.name}: ${error.message}`);
    if (error.response && error.response.data) {
      if (error.response.data.error) {
        const e = new Error(error.response.data.error);
        e.status = error.response.status;
        throw e;
      } else if (error.response.data.details && Array.isArray(error.response.data.details)) {
        const e = new Error(options.errSource
          ? error.response.data.details[0].source : error.response.data.details[0].message);
        e.status = error.response.status;
        throw e;
      } else if (error.response.data.message) {
        const e = new Error(error.response.data.message);
        e.status = error.response.status;
        throw e;
      }
      throw error;
    } else {
      throw new CustomError({ message: `Gateway error: ${error.name}: ${error.message}`, status: 502 });
    }
  }
}
