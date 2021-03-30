import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { RegistrationUser } from 'src/app/shared/types/registration-user.type';
import { delay, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

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
      }).pipe(catchError(errorRes => {
        if (!errorRes.error || !errorRes.error.error) {
          return throwError({ unknownError: true });
        }
        switch (errorRes.error.error.message) {
          case 'EMAIL_EXISTS':
            return throwError({ emailExist: true });
        }
      }));
  }
}
