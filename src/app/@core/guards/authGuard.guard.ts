import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenStoreService } from '../mock/token.service';

export const authGuard: CanActivateFn = (route, state) => {
  console.log('entro')
  const tokenService = inject(TokenStoreService);
  const router = inject(Router);

  const isAuthenticate = tokenService.get() !== null;
  if (!isAuthenticate) {
    router.navigateByUrl('/pages/auth/login');
    return false;
  }

  return isAuthenticate;
};
