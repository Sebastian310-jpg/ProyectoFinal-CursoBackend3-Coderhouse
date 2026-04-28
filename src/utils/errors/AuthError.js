import CustomError from "./CustomError.js";

class AuthError extends CustomError {
  constructor(message = 'Authentication Error', status = 401){
    super(message, status);
    this.name = 'AuthenticationError';
  }
}

export default AuthError;