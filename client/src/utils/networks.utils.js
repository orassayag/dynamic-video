import axios from 'axios';

export default class NetworksUtils {
  constructor() {
    throw new Error({ message: 'Cannot create an instance of a static class' });
  }

  /**
   * Send a request.
   *
   * This function gets the request options and performs a send request operation. If successful,
   * return the data (If exists). If failed, log all the details and throw an error.
   * @param options - The AXIOS sends request options (Headers, request type, etc).
   * @return {object}
   */
  static async sendRequest({
    url,
    method,
    payload = null,
  }) {
    const options = {
      url,
      method,
      data: payload,
      headers: {
        'Content-Type': 'application/json',
      },
    };
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
    * @param options - The AXIOS sends request options (Headers, request type, etc).
    * @return {object}
    */
  static handleRequestError(error, options) {
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
      throw new Error({ message: `Gateway error: ${error.name}: ${error.message}`, status: 502 });
    }
  }
}
