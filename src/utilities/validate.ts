import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { AppError } from './errorHandler';

export const validateDto = (schemaDto: Joi.ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value } = schemaDto.validate(req, { abortEarly: false });

    if (error) return res.status(400).json({ name: error.name, message: error.message });

    req.params = value.params;
    req.query = value.query;
    req.body = value.body;
    next();
  } catch (err: any) {
    const httpCode = +err.httpCode || 500;
    const message = err.message || err.name || "Internal Server Error";

    console.log(`Error: ${err.message}`);
    res.status(httpCode).json({ status: "failure", message });
  }
}

const canAccess = (credential: CredentialUser, data: any, authorizeKey?: string): boolean => {
  const userData = authorizeKey ? data[authorizeKey] : [data?.user, data?.createdBy];

  if (Array.isArray(userData)) {

    return userData.some(user => {
      if (typeof user === "object") return user?.userId === credential.userId;

      return user === credential.userId; // In this case, the user is a string and it is the userId
    });
  }

  if (typeof userData === "object") return userData?.userId === credential.userId;

  return userData === credential.userId; // In this case, the userData is a string and it is the userId
}

export const validateDataAccess = <T>(data: T, credential: CredentialUser, authorizeKey?: string): T => {
  if (!credential) {
    throw new AppError("You do not have permission to access this data", "Forbidden", 403);
  }

  if (!data || credential.isAdmin) return data;

  if (Array.isArray(data)) {
    const validData = data.map(each => canAccess(credential, each, authorizeKey) ? each : null);

    return validData as T;
  }

  if (!canAccess(credential, data, authorizeKey)) {
    throw new AppError("You do not have permission to access this data", "Forbidden", 403);
  }

  return data;
}