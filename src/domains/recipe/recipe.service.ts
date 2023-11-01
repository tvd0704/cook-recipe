import { validateDataAccess } from "./../../utilities/validate";
import { dataSource } from "../../configs/data-source";
import { AppError } from "../../utilities/errorHandler";
import { Recipe } from "./model/recipe.entity";
import { IFindOne, IRecipe, IRecipeUpdate } from "./model/recipe.interface";

const recipeRepository = dataSource.getRepository(Recipe);

export const addRecipe = (input: IRecipe): Promise<Recipe> =>
  recipeRepository.save(input);

export const deleteRecipe = async (
  recipeId: string,
  credential: CredentialUser
) => {
  const existingRecipe = await recipeRepository.findOneBy({ recipeId });

  if (!existingRecipe)
    throw new AppError(`Id ${recipeId} does not exist`, "NotFound", 404);

  validateDataAccess(existingRecipe, credential, "createdBy");

  return recipeRepository.softDelete({ recipeId });
};

export const updateRecipe = async ({
  recipeId,
  recipeData,
  credential,
}: IRecipeUpdate): Promise<IRecipe> => {
  const existingRecipe = await recipeRepository.findOneBy({ recipeId });

  if (!existingRecipe)
    throw new AppError(`Id ${existingRecipe} does not exist`, "NotFound", 404);

  validateDataAccess(existingRecipe, credential, "createdBy");

  await recipeRepository.update({ recipeId }, recipeData);

  return { ...existingRecipe, ...recipeData };
};

export const getAllRecipe = async (credential: CredentialUser) => {
  const recipes = await recipeRepository.find();

  return recipes;
};

export const getRecipe = async (
  recipeId: string,
  credential: CredentialUser
) => {
  const recipe = await recipeRepository.findOneBy({ recipeId });
  return recipe;
};

export const findOne = async ({
  query,
  checkExistence,
  credential,
}: IFindOne) => {
  const existingRecipe = await recipeRepository.findOneBy(query);

  if (checkExistence?.flag && !existingRecipe) {
    throw new AppError(
      checkExistence.errorMsg ?? "Car does not exist",
      "NotFound",
      404
    );
  }

  validateDataAccess(existingRecipe, credential, "createdBy");

  return existingRecipe;
};

export const searchRipe = async (search_query: any) => {
  var query = `
    SELECT recipeId FROM recipes
    WHERE title LIKE '%${search_query}%'`;

  const recipe = dataSource.query(query);
  return recipe;
};
