import { Injectable } from '@angular/core';
import { UserData } from '../data/usersModel';
import { AuthService } from '../root/auth.service';
import { Observable } from 'rxjs';

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
