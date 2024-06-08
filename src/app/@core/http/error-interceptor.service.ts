import { catchError, Observable, map, of } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpResponse,
  HttpHandler,
  HttpRequest,
  HttpInterceptor,
} from '@angular/common/http';
import { NotificationService } from '../../@theme/components/notification/notification.service';

/**
 * Handdler Error de las peticiones a la api
 *
 * @class ErrorInterceptorService
 * @implements HttpInterceptor
 */
@Injectable()
export class ErrorInterceptorService implements HttpInterceptor {
  constructor(private readonly notificationService: NotificationService) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        console.log(event)
        if (event instanceof HttpResponse) {
          if (event.body.exception)
            this.notificationService.showNotification({
              title: `${event.body.exception.response.status} Error`,
              type: 'error',
              message: `${event.body.exception.response.error} \n ${event.url}`,
              duration: 5000,
            });
          // console.log(`${event.statusText} ${event.status} ${event.url}`);
        }

        return event;
      }),
      // catchError((error) => {
      //   // if (error?.error?.error === "Authentication failed.") {

      //   //   console.log({ error })
      //   //   return of()
      //   // }
      //   console.log(error)
      //   throw new Error(error)
      // })
    );
  }
}
