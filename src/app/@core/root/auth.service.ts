import { Injectable } from '@angular/core';
import { TokenStorage, TokenStoreService } from '../mock/token.service';
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
    //  TODO: Add rout `auth/sign-out` in backend
    this.tokenService.clear();
    this.router.navigateByUrl('/auth/login');
    // this.httpClient
    //   .delete<any>(`auth/sign-out`, this.getOptions())
    //   .subscribe((response) => {
    //     if (response.response)
    //       this.tokenService.clear()
    //       this.router.navigateByUrl('/auth/login');
    //   });
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
