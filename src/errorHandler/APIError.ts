import BaseError from './BaseError';
import HttpStatusCode from './HttpStatusCode';

export default class APIError extends BaseError {
  constructor(
    name: string,
    httpCode = HttpStatusCode.INTERNAL_SERVER,
    isOperational = true,
    description = 'internal server error',
  ) {
    super(name, httpCode, isOperational, description);
  }
}
