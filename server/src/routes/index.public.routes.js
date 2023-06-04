import express from 'express';
import StoryboardsRoutes from './public/storyboards.routes.js';
import CustomError from '../custom/error.custom.js';

export default class IndexPublicRoutes {
  constructor() {
    throw new CustomError({ message: 'Cannot create an instance of a static class' });
  }

  /**
    * Initiate.
    *
    * Initiate the public routes: storyboards.
    * @return {object}
    */
  static initiate() {
    const routes = express();
    routes.use('/storyboards', StoryboardsRoutes.initiate());
    return routes;
  }
}
