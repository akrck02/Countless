export class ApiError extends Error {
  public statusCode: number;
  public internalError: number;

  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
  }

  public json() {
    return {
      message: this.message,
      statusCode: this.statusCode,
    };
  }
}
