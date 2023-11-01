import { UserRole } from "../common";
import { UserStatus } from "../domains/user/model/user.entity";
import { Response, Request, NextFunction } from "express";
import { AppError } from "../utilities/errorHandler";

type RequiredRoles = (
  | UserRole
  | { roleName: UserRole; status?: UserStatus[] | UserStatus }
)[];

export const checkRole =
  (roles: RequiredRoles) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.credential)
      throw new AppError("User must be authenticated", "Unauthorized", 401);
    const { role, status, isAdmin } = req.credential;

    if (isAdmin || !roles.length) {
      next();

      return;
    }

    const isValid = roles.some((data) => {
      if (typeof data === "string")
        return data === role && UserStatus.Active === status;

      if (!data.status)
        return data.roleName === role && UserStatus.Active === status;

      if (typeof data.status === "string")
        return data.roleName === role && data.status === UserStatus.Active;

      return (
        data.roleName === role && data.status.includes(status as UserStatus)
      );
    });

    if (!isValid)
      throw new AppError(
        "You don't have permission to access",
        "Forbidden",
        403
      );

    next();
  };
