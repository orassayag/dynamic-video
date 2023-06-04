export default class CustomError extends Error {
  constructor({ message = 'An error occurred', status = 400 }) {
    super(message);
    this.status = status;
    this.message = message;
    Error.captureStackTrace(this, this.constructor);
  }
}
