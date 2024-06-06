import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenStoreService } from '../mock/token.service';

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenStoreService);
  const router = inject(Router);

  const isAuthenticate = !!tokenService.get();
  if (!isAuthenticate) {
    router.navigateByUrl('/auth/login');
    return false;
  }

  return isAuthenticate;
};
