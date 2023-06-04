import StoryboardModel from '../models/storyboard/storyboard.model.js';
import CustomError from '../custom/error.custom.js';

export default class StoryboardsController {
  constructor() {
    throw new CustomError({ message: 'Cannot create an instance of a static class' });
  }

  /**
    * Get an existing storyboard.
    *
    * This function gets all the server built in parameters, and passes the request query that
    * contains the storyboard Id to search and return the storyboard by the given Id.
    * @param {object} req - A request object with the body and parameters.
    * @param {object} res - A response object to return JSON.
    * @param {object} next - The next middleware function in the chain.
    * @return {Promise<object>}
    */
  static async getById(req, res, next) {
    try {
      const result = await StoryboardModel.getById(req.params.id);
      return res.json(result);
    } catch (error) {
      return next(error);
    }
  }

  /**
    * Generates a new video.
    *
    * This function gets all the server built in parameters, and passes the request body that
    * contains all the storyboard details to generate a new video and return the relevant details.
    * @param {object} req - A request object with the body and parameters.
    * @param {object} res - A response object to return JSON.
    * @param {object} next - The next middleware function in the chain.
    * @return {Promise<object>}
    */
  static async create(req, res, next) {
    try {
      const result = await StoryboardModel.create(req.body);
      return res.json(result);
    } catch (error) {
      return next(error);
    }
  }
}
