import Joi from "joi";

const register = Joi.object({
  body: Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }),
    phoneNumber: Joi.string().pattern(new RegExp("^[0-9]{9,15}$")).optional(),
    password: Joi.string()
      .pattern(
        new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})"
        )
      )
      .required()
      .label("password")
      .messages({
        "string.pattern.base":
          "{{#label}} must contain uppercase, lowercase, number, special character",
      })
      .required(),
    firstName: Joi.string().max(100).optional(),
    lastName: Joi.string().max(100).optional(),
  }),
}).unknown(true);

const login = Joi.object({
  body: Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().required(),
  }),
}).unknown(true);

export default {
  register,
  login,
};
