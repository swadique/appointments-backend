const Joi = require("joi");
const PublicRequestSchemas = {
  login: Joi.object().keys({
    email: Joi.string().min(6).max(30).email().required(),
    password: Joi.string().max(10).min(6).required(),
  }),
  register: Joi.object().keys({
    firstName: Joi.string().max(10).min(6).required(),
    lastName: Joi.string().max(10).min(6),
    userType: Joi.string().max(20).min(2).required(),
    email: Joi.string().min(6).max(30).email().required(),
    password: Joi.string().max(10).min(6).required(),
    timeSlots: Joi.any(),
  }),
};
module.exports = PublicRequestSchemas;
