import { Request, Response, NextFunction } from 'express';


export class AppError extends Error {
  httpCode: number;
  status: string;

  constructor(message: string, status: string, httpCode: number) {
    super(message);
    this.status = status;
    this.httpCode = httpCode;
  }
}

export const catchError = (fn:Function) => (req:Request, res:Response, next:NextFunction) =>{
    Promise.resolve(fn(req,res,next)).catch((error) => {
        next(error)
    } )
}

export const handleException = ((err:any, req:Request, res:Response, next:NextFunction) => {
 const httpCode = err.httpCode || err.statusCode || 500;
 const message = err.message || err.name || "Internal Server Error";
 const status = err.status || "failture";

 if(httpCode == 500) {
    console.log(`Error: ${err.stack}`);
 }
 res.status(httpCode).json({status, message})
})