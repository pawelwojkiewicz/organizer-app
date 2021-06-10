import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { take, exhaustMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Pobieramy 1 wartosc z naszego obiektu User i za pomoca exhaustMap() czekamy az wartosc zostanie pobrana i dopiero pozniej
    // zwracamy nasza observable która zamieni sie z observabla ktora ja opakowuje
    return this.authService.user$.pipe(
      take(1),
      exhaustMap(user => {
        if (!user) {
          return next.handle(request);
        }
        const requestWithToken = request.clone({
          params: new HttpParams().set('auth', user.token)
        });
        return next.handle(requestWithToken);
      })
    );
  }
}
