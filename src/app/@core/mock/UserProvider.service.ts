import { Injectable } from '@angular/core';
import { IUser, UserData } from '../data/usersModel';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserProviderService extends UserData {

  constructor(
    private router: Router,
    protected httpClient: HttpClient,
    protected authService: AuthService
  ) {
    super(httpClient);
  }

  /**
   * @name getUsuer
   * @description Recupera la informacion del usuario logueado
   * @returns IuserProveedor | IuserTienda
   */
  // getUser$(): Observable<IUser> {
    // if (this.authService.authenticate)
    //   return this.authService.onTokenChange()
    //     .pipe(
    //       map((token: NbAuthJWTToken) => {
    //         return token.isValid() ? token.getPayload().usuario : null;
    //       }),
    //     );
    // else
    //   return null;
  }

  /**
   * @name logOut$
   * @description Destruye el token de session y elimina la sesion. Redirige al login
   * @return void
   */
  logOut$(): void {
    // this.httpClient.delete<Iresponse>(`${this.baseURL}auth/sign-out`, this.getOptions())
    //   .subscribe((response) => {
    //     if (response.response)
    //       this.authService.logout('email').subscribe((res: NbAuthResult) => {
    //         if (res.isSuccess()) {
    //           this.router.navigateByUrl('/auth/login');
    //         }
    //       });
    //   });
  }
}
