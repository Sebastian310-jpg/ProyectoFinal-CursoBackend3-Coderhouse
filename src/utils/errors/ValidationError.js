import CustomError from "./CustomError.js";

class ValidationError extends CustomError {
  constructor(message = 'Invalid Data', status = 400){
    super(message, status);
    this.name = 'ValidationError';
  }
}

export default ValidationError;