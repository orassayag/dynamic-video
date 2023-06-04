import debugFactory from 'debug';
import CustomError from '../custom/error.custom.js';

export default class ExpressHelper {
  constructor() {
    throw new CustomError({ message: 'Cannot create an instance of a static class' });
  }

  /**
   * Validate the server port.
   *
   * Validate that the port supplied to the server is valid.
   * @param {integer} post
   * @returns {integer}
   */
  static validatePort(port) {
    const portNumber = +port;
    if (isNaN(portNumber)) {
      return portNumber;
    }
    if (portNumber >= 0) {
      return portNumber;
    }
    return 0;
  }

  /**
   * Listen to the server.
   *
   * Listen to the server on debugging.
   * @param {integer} server
   * @returns {void}
   */
  static onListening = (server) => () => {
    const debug = debugFactory('tutorial:server');
    const addr = server.address();
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
    debug(`Listening on ${bind}`);
  };

  /**
   * On error on the server.
   *
   * Handle any errors on the server.
   * @param {object} server - The server object.
   * @returns {void}
   */
  static onError = (port) => (error) => {
    if (error.syscall !== 'listen') {
      throw error;
    }
    const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;
    // Handle specific listen errors with friendly messages.
    switch (error.code) {
      case 'EACCES':
        console.error(`Post ${bind} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(`Post ${bind} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  };
}
