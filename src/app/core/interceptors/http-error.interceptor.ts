import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(
        retry(1),

        catchError((errorResponse: HttpErrorResponse) => {
          let errorMessage = '';
          if (errorResponse.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${errorResponse.error.message}`;
            window.alert(errorMessage);
            return throwError(errorMessage);
          } else {
            // server-side error
            errorMessage = errorResponse.error.error.message;
            if (!errorResponse.error || !errorResponse.error.error) {
              return throwError({ unknownError: true });
            }
            switch (errorMessage) {
              case 'EMAIL_EXISTS':
                return throwError({ emailExist: true });
              case 'EMAIL_NOT_FOUND':
                return throwError(errorMessage);
              case 'INVALID_PASSWORD':
                return throwError(errorMessage);
            }
          }
        })
      );
  }
}
