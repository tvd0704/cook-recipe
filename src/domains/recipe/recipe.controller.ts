import { NextFunction, Request, Response } from "express";
import * as recipeService from "./recipe.service";

export const addRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  
  req.body.image = req.file?.filename;
  const recipe = await recipeService.addRecipe({
    ...req.body,
    createdBy: req.credential.userId,
  });
  res.status(200).json({
    status: "success",
    data: recipe,
  });
};

export const deleteRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await recipeService.deleteRecipe(req.params.recipeId, req.credential);

  res.status(200).json({
    status: "successsssssss",
    data: null,
  });
};

export const getAllRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const recipes = await recipeService.getAllRecipe(req.credential);

  res.status(200).json({
    status: "success",
    data: recipes,
  });
};

export const getRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const recipe = await recipeService.getRecipe(
    req.params.recipeId,
    req.credential
  );

  res.status(200).json({
    status: "success",
    data: recipe,
  });
};

export const updateRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const recipe = await recipeService.updateRecipe({
    recipeId: req.params.recipeId,
    recipeData: req.body,
    credential: req.credential,
  });

  res.status(200).json({
    status: "success",
    data: recipe,
  });
};
