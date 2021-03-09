import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiKey = 'AIzaSyBl7PiYrxj5G_O4PhMaGjGoC3n8-U1VvWk';
  registerEndPoint = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}';

  constructor(private http: HttpClientModule) {
  }

  register() {

  }
}
