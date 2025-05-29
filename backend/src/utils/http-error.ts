import { HttpStatusCode } from "../config/http.config";

export class HttpError extends Error {
  public statusCode: HttpStatusCode;
  public errorCode?: string;

  constructor(statusCode: HttpStatusCode, message: string, errorCode?: string) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;

    Object.setPrototypeOf(this, HttpError.prototype);
  }
}
