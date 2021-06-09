import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, Subject, BehaviorSubject } from 'rxjs';
import { RegistrationUser } from 'src/app/shared/types/registration-user.type';
import { delay, catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginUser } from 'src/app/shared/types/login-user.type';
import { User } from 'src/app/shared/models/user.model';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user = new BehaviorSubject<User>(null);
  user$ = this.user.asObservable();
  private expirationTimeout: any;


  constructor(
    private http: HttpClient,
    private router: Router,
    public jwtHelper: JwtHelperService
  ) { }

  public isAuthenticated(): boolean {
    if (localStorage.getItem('user')) {
      const token = JSON.parse(localStorage.getItem('user'))._token;
      return !this.jwtHelper.isTokenExpired(token);
    }
  }

  register(email: string, password: string): Observable<RegistrationUser> {
    return this.http.post<RegistrationUser>(
      environment.registerApiUrl,
      {
        email,
        password,
        returnSecureToken: true
      }).pipe(
        catchError(this.handleError)
      );
  }

  login(email: string, password: string): Observable<LoginUser> {
    return this.http.post<LoginUser>(
      environment.loginApiUrl,
      {
        email,
        password,
        returnSecureToken: true
      }
    ).pipe(
      tap(resData => {
        this.handleAuthentication(
          resData.email,
          resData.localId,
          resData.idToken,
          +resData.expiresIn
        );
      }),
      catchError(this.handleError)
    );
  }



  autoLogin(): void {

    const storagedUser = JSON.parse(localStorage.getItem('user'));
    if (!storagedUser) {
      return;
    }
    const user = new User(
      storagedUser.email,
      storagedUser.id,
      storagedUser._token,
      new Date(storagedUser._tokenExpirationDate)
    );

    if (user.token) {
      this.user.next(user);

      const expirationDuration = (
        new Date(storagedUser._tokenExpirationDate).getTime() -
        new Date().getTime()
      );
      this.autoLogout(expirationDuration);
    }
  }

  logout(): void {
    this.user.next(null);
    localStorage.removeItem('user');
    this.router.navigate(['/']);
    if (this.expirationTimeout) {
      clearTimeout(this.expirationTimeout);
    }
    this.expirationTimeout = null;
  }

  autoLogout(expirationDuration: number): void {
    this.expirationTimeout = setTimeout(
      () => {
        this.logout();
      }, expirationDuration
    );
  }

  handleError(errorRes: HttpErrorResponse): Observable<never> {
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
      case 'TOO_MANY_ATTEMPTS_TRY_LATER : Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.':
        return throwError(errorMessage);
    }
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ): void {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const newUser = new User(
      email,
      userId,
      token,
      expirationDate
    );
    this.user.next(newUser);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('user', JSON.stringify(newUser));
  }
}


