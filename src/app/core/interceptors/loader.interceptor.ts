import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from '../services/loader.service';
import { finalize } from 'rxjs/operators';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  counter = 0;

  constructor(public loaderService: LoaderService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.counter++;
    if (this.counter > 0) {
      this.loaderService.isLoading.next(true);
    }
    return next.handle(request).pipe(
      finalize(
        () => {
          this.counter--;
          if (this.counter === 0) {
            this.loaderService.isLoading.next(false);
          }
        }
      )
    );
  }
}
