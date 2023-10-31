import { UserRole } from "../../../common";
import { UserStatus } from "./user.entity";

export interface IUser {
  status: UserStatus;
  email?: string;
  password: string;
  phoneNumber: string;
  role: UserRole;
  firstName?: string;
  lastName?: string;
}

export interface ILogin {
  email: string;
  password: string;
}

interface IFindOneQuery {
  userId?: string;
  email?: string;
  phoneNumber?: string;
}

export interface IFindOne {
  query: IFindOneQuery;
  checkExistence?: {
    flag: boolean;
    errorMsg?: string;
  };
  checkActive?: boolean;
}
