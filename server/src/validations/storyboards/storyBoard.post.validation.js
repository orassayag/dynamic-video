import Joi from 'joi';

export default Joi.array().items(
  Joi.object().keys({
    key: Joi.alternatives().try(Joi.string().min(2).max(500), Joi.number()).required()
      .required(),
    value: Joi.alternatives().try(Joi.string().min(2).max(500), Joi.number()).required()
      .required(),
    isData: Joi.boolean()
      .required(),
  }),
);
