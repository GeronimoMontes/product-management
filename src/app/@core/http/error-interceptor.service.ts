import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpResponse,
  HttpHandler,
  HttpRequest,
  HttpInterceptor,
} from '@angular/common/http';

/**
 * Handdler Error de las peticiones a la api
 *
 * @class ErrorInterceptorService
 * @implements HttpInterceptor
 */
@Injectable()
export class ErrorInterceptorService implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log(`${event.statusText} ${event.status} ${event.url}`);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        return throwError(`PETICION HTTP: ${error.message}`);
      })
    );
  }
}
