import HttpStatusCode from './HttpStatusCode';

export default class BaseError extends Error {
  constructor(
    readonly name: string,
    readonly httpCode: HttpStatusCode,
    readonly isOperational: boolean,
    description: string
  ) {
    super(description)
    Error.captureStackTrace(this);
  }
}
