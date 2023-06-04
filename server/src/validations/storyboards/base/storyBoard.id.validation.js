import Joi from 'joi';

export default {
  id: Joi.string().min(1).max(Number.MAX_SAFE_INTEGER)
    .required(),
};
