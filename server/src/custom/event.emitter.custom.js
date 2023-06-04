import { EventEmitter } from 'events';

class CustomEventEmitter extends EventEmitter {
  // Here we can add custom logic for this event emitter.
}

const customEventEmitter = new CustomEventEmitter();

export default customEventEmitter;
