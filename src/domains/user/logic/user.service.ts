import { IFindOne, ILogin } from "./../model/user.interface";
import { dataSource } from "../../../configs/data-source";
import { AppError } from "../../../utilities/errorHandler";
import { User, UserStatus } from "../model/user.entity";
import { IUser } from "../model/user.interface";
import { Response, Request } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userRepository = dataSource.getRepository(User);

export const create = async (input: IUser): Promise<User> => {
  const { email } = input;
  const existingUser = await userRepository.findOne({ where: [{ email }] });

  if (existingUser) {
    const msg: string[] = [];
    if (email === existingUser.email) {
      msg.push(`email ${email}`);
    }
    throw new AppError(
      `The ${msg.join(" and ")} already exist`,
      "BadRequest",
      400
    );
  }

  const user = userRepository.create(input);
  return userRepository.save(user);
};

export const login = async ({ email, password }: ILogin): Promise<string> => {
  const existingUser = await userRepository.findOne({
    where: { email },
    select: [
      "userId",
      "firstName",
      "lastName",
      "email",
      "phoneNumber",
      "status",
      "password",
      "role",
    ],
  });
  if (!existingUser)
    throw new AppError("The email does not exist", "NotFound", 404);

  if (existingUser.status !== UserStatus.Active) {
    throw new AppError("The account has not been activated", "BadRequest", 400);
  }

  if (!bcrypt.compareSync(password, existingUser.password)) {
    throw new AppError("Incorrect password", "BadRequest", 400);
  }

  const accessToken = jwt.sign(
    {
      userId: existingUser.userId,
      firstName: existingUser.firstName,
      lastName: existingUser.lastName,
      email: existingUser.email,
      phoneNumber: existingUser.phoneNumber,
      status: existingUser.status,
      role: existingUser.role,
    },
    process.env.TOKEN_SECRET as string,
    {
      expiresIn: process.env.TOKEN_EXPIRED || "90d",
    }
  );

  return accessToken;
};

export const signOut = async (req: Request, res: Response) => {
  const token = undefined;
  return token;
};

export const findOne = async ({
  query,
  checkExistence = { flag: false },
  checkActive = false,
}: IFindOne): Promise<User | null> => {
  const existingUser = await userRepository.findOneBy(query);

  if (checkExistence.flag && !existingUser) {
    throw new AppError(
      checkExistence.errorMsg ?? "Account does not exist",
      "NotFound",
      404
    );
  }

  if (
    checkActive &&
    existingUser &&
    existingUser.status !== UserStatus.Active
  ) {
    throw new AppError("The account has not been activated", "BadRequest", 400);
  }

  return existingUser;
};
