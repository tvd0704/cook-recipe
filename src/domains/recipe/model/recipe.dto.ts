import Joi from "joi";

const recipe = {
  title: Joi.string().trim().max(100),
  content: Joi.string().trim().max(100),
  image: Joi.string().optional(),
};

export const addRecipe = Joi.object({
  headers: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(true),
  body: Joi.object(recipe).min(1).required(),
}).unknown(true);

export const deleteRecipe = Joi.object({
  headers: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(true),
  params: {
    recipeId: Joi.string().uuid().required(),
  },
}).unknown(true);

export const updateRecipe = Joi.object({
  headers: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(true),
  body: Joi.object(recipe).min(1).required(),
}).unknown(true);

export const getAllRecipe = Joi.object({
  headers: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(true),
}).unknown(true);

export const getRecipe = Joi.object({
  headers: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(true),
  params: {
    recipeId: Joi.string().uuid().required(),
  },
}).unknown(true);
