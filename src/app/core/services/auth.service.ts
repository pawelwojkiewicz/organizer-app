import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegistrationUser } from 'src/app/shared/types/registration-user.type';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiKey = 'AIzaSyBl7PiYrxj5G_O4PhMaGjGoC3n8-U1VvWk';
  registerEndPoint = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`;

  constructor(private http: HttpClient) {
  }

  register(email: string, password: string): Observable<RegistrationUser> {
    return this.http.post<RegistrationUser>(
      this.registerEndPoint,
      {
        email,
        password,
        returnSecureToken: true
      }).pipe(delay(2000));
  }
}
