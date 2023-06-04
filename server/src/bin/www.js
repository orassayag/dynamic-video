import server from '../app.js';
import CONSTANTS from '../config/constants.config.js';
import CustomEventEmitter from '../custom/event.emitter.custom.js';

// Perform here all the one-time events after the server initiated successfully.
CustomEventEmitter.on(CONSTANTS.EVENTS.SERVER_UP, async () => {
  // Load all the users and the products (Simulate to initiate the database connection).
});

export default server;
