import { Observable } from 'rxjs';
//
import { Injectable } from '@angular/core';
import { HttpEvent } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpInterceptor } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from '../mock/auth.service';

/**
 * Rutas que no requieren autorizacion `Bearer Token`
 */
const AUTH_BEARER_REQUIRE: string[] = ['auth/login', `products`];

const BODY_FORM_DATA: string[] = [];

/**
 * Agrega la autenticacion Bearer token a las cabeceras HTTP
 *
 * @class AuthInterceptorService
 * @implements HttpInterceptor
 */
@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(protected readonly authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    var URL = req.url.replace(environment.API_URL, '');

    if (URL.indexOf('?') > -1) {
      URL = URL.substring(0, URL.indexOf('?'));
    }

    // AUTORIZACION MEDIANTE BEARER TOKEN
    if (!AUTH_BEARER_REQUIRE.includes(URL)) {
      if (this.authService.authenticate) {
        req = req.clone({
          setHeaders: { Authorization: `Bearer ${this.authService.token}` },
        });
      }
    }

    /**
     * CONTENIDO DE LA PETICION PARA SUBIDA DE ARCHIVOS
     */
    if (BODY_FORM_DATA.includes(URL)) {
      req = req.clone({
        setHeaders: { 'Content-Type': 'multipart/form-data' },
      });
    }

    /**
     * CONTENIDO DE LA PETICION EN FORMATO JSON
     */
    if (!req.headers.has('Content-Type') && !BODY_FORM_DATA.includes(URL)) {
      req = req.clone({
        setHeaders: { 'Content-Type': 'application/json' },
      });
    }

    // FORMATO DE RESPUESTA DE LA API
    req = req.clone({
      setHeaders: { Accept: 'application/json' },
    });

    return next.handle(req);
  }
}
