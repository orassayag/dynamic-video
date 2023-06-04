import CustomError from '../custom/error.custom.js';

export default class DataUtils {
  constructor() {
    throw new CustomError({ message: 'Cannot create an instance of a static class' });
  }

  /**
    * Set a key.
    *
    * This function gets a string and convert it to a key representation.
    * @param value - The string to convert to a key.
    * @return {function}
    */
  static setKey(value) {
    return value.toLowerCase().replaceAll(' ', '_');
  }
}
