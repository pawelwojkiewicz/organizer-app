import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { GlobalErrorHandler } from './handlers/global-error-handler';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,

  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    {
      // processes all errors
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    },
    {
      // processes all http errors
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ]
})
export class CoreModule { }
