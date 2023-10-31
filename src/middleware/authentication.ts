import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../utilities/errorHandler";
import { User } from "../domains/user/model/user.entity";
import { UserRole } from "../common";
import * as userService from "../domains/user/logic/user.service";

export const authJwt = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = req.headers.authorization
      ? req.headers.authorization.split(" ")
      : null;
    if (!accessToken || accessToken[0] !== "Bearer" || !accessToken[1]) {
      throw new AppError("Please provide a Bearer token", "BadRequest", 400);
    }

    const data: any = jwt.verify(
      accessToken[1],
      process.env.TOKEN_SECRET as string
    );

    if (!data) {
      throw new AppError(
        "there is something wrong with access token",
        "BadRequest",
        400
      );
    }

    const { userId, email, phoneNumber, role, status } =
      (await userService.findOne({
        query: {
          userId: data.userId,
        },
        checkExistence: { flag: true },
        checkActive: true,
      })) as User;

    req.credential = {
      userId,
      email,
      phoneNumber,
      role,
      status,
      isAdmin: role === UserRole.Admin,
    };

    next();
  } catch (error: any) {
    error.httpCode = 400;
    next(error);
  }
};
