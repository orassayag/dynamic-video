import CONSTANTS from '../config/constants.config.js';
import CustomError from '../custom/error.custom.js';

export default class AppsUtils {
  constructor() {
    throw new CustomError({ message: 'Cannot create an instance of a static class' });
  }

  /**
   * Check if PRODUCTION or QA by parameter.
   *
   * Check if the current environment is PRODUCTION or QA by parameter.
   * @param environment - The input parameter to check for the environment.
   * @return {boolean}
   */
  static isProductionOrQA(environment) {
    return process.env.NODE_ENV === CONSTANTS.ENVIRONMENTS.PRODUCTION
      || environment?.trim().toLowerCase() === CONSTANTS.ENVIRONMENTS.QA;
  }
}
