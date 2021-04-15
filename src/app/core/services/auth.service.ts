import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { RegistrationUser } from 'src/app/shared/types/registration-user.type';
import { delay, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginUser } from 'src/app/shared/types/login-user.type';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(email: string, password: string): Observable<RegistrationUser> {
    return this.http.post<RegistrationUser>(
      environment.registerApiUrl,
      {
        email,
        password,
        returnSecureToken: true
      }).pipe(catchError(this.handleError));
  }
  login(email: string, password: string): Observable<LoginUser> {
    return this.http.post<LoginUser>(
      environment.loginApiUrl,
      {
        email,
        password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handleError));
  }

  private handleError(errorRes: HttpErrorResponse): Observable<never> {
    const errorMessage = errorRes.error.error.message;
    if (!errorRes.error || !errorRes.error.error) {
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
}


