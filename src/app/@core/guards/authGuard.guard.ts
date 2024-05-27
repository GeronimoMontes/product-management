import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
  ) { }

  private isAuthenticated(): Observable<boolean> {
    const token = localStorage.getItem('auth_app_token');
    return new Observable(obs => obs.next(token !== null));
  }

  canActivate() {
    return this.isAuthenticated()
      .pipe(
        tap(authenticated => {
          if (!authenticated) {
            this.router.navigate(['pages/home/productos']);
          }
        }),
      );
  }
}
