import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { UserData } from '../data';
import { TokenStorage, TokenStoreService } from '../mock/token.service';

@Injectable()
export class AuthService extends UserData {
  constructor(
    protected readonly tokenService: TokenStoreService,
    protected readonly httpClient: HttpClient,
    protected readonly router: Router
  ) {
    super(httpClient);
  }

  isAuthenticate(): Observable<boolean> {
    return this.tokenStorage.pipe(map((token) => (token ? true : false)));
  }

  login$(body: { username: string; password: string }) {
    const url = `auth/login`;
    return this.httpClient.post<any>(url, body, {}).pipe(
      map((response) => {
        if (!!response.access_token) {
          const { access_token } = response;
          this.tokenService.set(access_token);
          this.router.navigateByUrl('/pages/products/table-paginate');
        }
        return response;
      })
    );
  }

  logOut$(): void {
    this.tokenService.clear();
    this.router.navigateByUrl('/auth/login');
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

  // FIXME:
  get tokenString(): TokenStorage {
    return this.tokenService.get();
  }
}
