import CustomError from '../custom/error.custom.js';

export default class JoiMiddleware {
  constructor() {
    throw new CustomError({ message: 'Cannot create an instance of a static class' });
  }

  /**
   * Validate middleware.
   *
   * Validate incoming request to the route.
   * @param {object} body - A body Joi schema object to validate.
   * @param {object} params - A params Joi schema object to validate.
   * @param {object} query - A query Joi schema object to validate.
   * @returns {function}
   */
  static validate = ({
    body,
    params,
    query,
  }) => async (req, res, next) => {
    let error = null;
    if (body) {
      error = await body.validate(req.body).error;
    }
    if (query) {
      error = await query.validate(req.query).error;
    }
    if (params) {
      error = await params.validate(req.params).error;
    }
    if (error) {
      return next(new CustomError({ message: error.details[0].message, status: error.status }));
    }
    return next();
  };
}
