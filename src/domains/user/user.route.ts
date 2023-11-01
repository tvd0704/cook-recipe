import { signOut } from "./logic/user.service";
import { Router } from "express";
import { catchError } from "../../utilities/errorHandler";
import userController from "./user.controller";
import { validateDto } from "../../utilities/validate";
import userDto from "./model/user.dto";
export const userRouter = Router();

userRouter.post(
  "/register",
  validateDto(userDto.register),
  catchError(userController.register)
);

userRouter.post(
  "/login",
  validateDto(userDto.login),
  catchError(userController.login)
);

userRouter.post("/signout", catchError(userController.signOut));
