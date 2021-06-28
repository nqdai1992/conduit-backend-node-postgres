import { NextFunction, Request, Response } from "express";
import BaseError from "./BaseError";
import ErrorHandler from "./ErrorHandler";

export default function errorMiddleware(err: Error, _req: Request, res: Response, next: NextFunction): void {
  if (!ErrorHandler.isTrustedError(err)) {
    return next(err);
  }
  ErrorHandler.handleError(err);
  const { httpCode, message } = err as BaseError;
  res.status(httpCode).send(message);
}