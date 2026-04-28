import CustomError from "./CustomError.js";

class NotFoundError extends CustomError {
  constructor(message = 'Resource Not Found', status = 404){
    super(message, status);
    this.name = 'NotFoundError';
  }
}

export default NotFoundError;