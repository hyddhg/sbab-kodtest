export default class HttpError extends Error {
  statusCode: number;

  constructor(message: string, code: number) {
    super(message);
    this.statusCode = code;
    Object.setPrototypeOf(this, HttpError.prototype);
  }

  get code() {
    return this.statusCode;
  }
}
