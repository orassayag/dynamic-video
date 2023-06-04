import express from 'express';
import JoiMiddleware from '../../middlewares/joi.middleware.js';
import StoryboardController from '../../controllers/storyboards.controller.js';
import getById from '../../validations/storyboards/storyBoard.getById.validation.js';
import create from '../../validations/storyboards/storyBoard.post.validation.js';
import CustomError from '../../custom/error.custom.js';

export default class StoryboardRoutes {
  constructor() {
    throw new CustomError({ message: 'Cannot create an instance of a static class' });
  }

  /**
    * Initiate.
    *
    * Initiate all the storyboards routes.
    * @return {object}
    */
  static initiate() {
    const router = express.Router();
    /**
      * @swagger
      * /api/storyboards/{id}:
      *   get:
      *     tags:
      *       - Storyboards
      *     description: Return a storyboard by Id.
      *     produces:
      *       - application/json
      *     parameters:
      *       - name: id
      *         description: The storyboard's Id.
      *         in: path
      *         required: true
      *         type: integer
      *     responses:
      *       200:
      *         description: The requested storyboard.
      *         schema:
      *           type: array
      *           items:
      *             properties:
      *               key:
      *                 type: string
      *                 default: string
      *               label:
      *                 type: string
      *                 default: string
      *               value:
      *                 oneOf:
      *                   - type: string
      *                   - type: integer
      *                 default: string
      *               isData:
      *                 type: boolean
      *                 default: false
      *       400:
      *         description: Bad Request (Request validation may have failed).
      *       404:
      *         description: Storyboard not found.
      *       500:
      *         description: Internal server error.
      */
    router.get(
      '/:id',
      JoiMiddleware.validate({ params: getById }),
      StoryboardController.getById,
    );

    /**
      * @swagger
      * /api/storyboards:
      *   post:
      *     tags:
      *       - Storyboards
      *     description: Generates a new video.
      *     produces:
      *       - application/json
      *     parameters:
      *       - name: body
      *         in: body
      *         required: true
      *         schema:
      *           type: object
      *           properties:
      *             key:
      *               type: string
      *               default: string
      *             value:
      *               oneOf:
      *                 - type: string
      *                 - type: integer
      *               default: string
      *             isData:
      *               type: boolean
      *               default: false
      *     responses:
      *       200:
      *         description: The created video Id.
      *         schema:
      *           type: object
      *           properties:
      *             id:
      *               type: string
      *               default: string
      *       400:
      *         description: Bad Request (Request validation may have failed).
      *       500:
      *         description: Internal server error.
      */
    router.post(
      '/',
      JoiMiddleware.validate({ body: create }),
      StoryboardController.create,
    );
    return router;
  }
}
