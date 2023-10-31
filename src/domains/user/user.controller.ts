import { Response, Request, NextFunction } from "express";
import * as userService from "./logic/user.service";

const register = async (req: Request, res: Response, next: NextFunction) => {
  await userService.create(req.body);
  res.status(200).json({
    status: "success",
    data: null,
  });
};


const login = async (req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  const accessToken = await userService.login(req.body);

  res.status(200).json({
    status: "success",
    accessToken
  });
}

const signOut=  async (req:Request, res:Response, next:NextFunction) => {
  const token = userService.signOut(req,res);
  res.status(200).json({
    status: "success",
    token
  });
}

export default {
  register,
  login,
  signOut
};
