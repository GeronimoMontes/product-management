import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserData } from '../data';
import { AuthService } from '../root/auth.service';



@Injectable({
  providedIn: 'root',
})
export class UserProviderService extends UserData {

  constructor(
    protected readonly authService: AuthService
  ) {
    super();
  }

  getUser$(): Observable<boolean> {
    return this.authService.authenticate;
  }

  logOut$(): void {
    this.authService.logOut$();
  }
}
