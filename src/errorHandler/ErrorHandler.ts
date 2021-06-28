import BaseError from "./BaseError";

class ErrorHandler {
  public async handleError(err: Error): Promise<void> {
    console.log(err);
  }

  public isTrustedError(error: Error) { 
    if (error instanceof BaseError) {
      return error.isOperational;
    }
    return false;
  }
}

export default new ErrorHandler();
