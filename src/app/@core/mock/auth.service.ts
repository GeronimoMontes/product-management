import { Injectable } from '@angular/core';
import { TokenStorage, TokenStoreService } from './token.service';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HeaderOption } from '../data/headerOptions';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends HeaderOption {
  constructor(
    protected readonly tokenService: TokenStoreService,
    protected readonly httpClient: HttpClient,
    protected readonly router: Router
  ) {
    super(httpClient);
  }

  private isAuthenticate(): Observable<boolean> {
    return this.tokenStorage.pipe(map((token) => (token ? true : false)));
  }

  login$(body: { username: string; password: string }): any {
    const url = `auth/login`;
    return this.httpClient.post<any>(url, body, {}).pipe(
      map((response) => {
        // TODO: Set token localstora
        const { access_token } = response;
        this.tokenService.set(access_token);
        // TODO: Redict home page
        this.router.navigateByUrl('/pages/products/table');
        return response;
      })
    );
  }

  logOut$(): void {
    this.httpClient
      .delete<any>(`auth/sign-out`, this.getOptions())
      .subscribe((response) => {
        if (response.response)
          // TODO: unset token localstorage

          this.router.navigateByUrl('/auth/login');
      });
  }

  /**
   * user is authenticate.
   */
  get authenticate(): Observable<boolean> {
    return this.isAuthenticate();
  }

  /**
   * Token storage in localstorage app.
   */
  get tokenStorage(): Observable<TokenStorage> {
    return new Observable((obs) => obs.next(this.tokenService.get()));
  }
}
