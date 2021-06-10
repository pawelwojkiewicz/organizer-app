import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor() { }
  // metoda handleError która wywoła się na samym końcu ( http-interceptor -> catchError -> global handler)
  handleError(error: Error): void {
    window.alert(error.message);
  }
}
