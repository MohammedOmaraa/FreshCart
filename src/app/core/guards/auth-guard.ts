import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, catchError, of } from 'rxjs';
import { AuthServices } from '../../features/auth/services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const _Router = inject(Router);
  const _AuthServices = inject(AuthServices);
  const platformId = inject(PLATFORM_ID);
  const isBrowser = isPlatformBrowser(platformId);

  if (!isBrowser) return true;

  const token = _AuthServices.getToken();
  const isAuthPath = state.url.startsWith('/signin') || state.url.startsWith('/signup');

  if (!token && !isAuthPath) {
    _Router.navigateByUrl('/signin');
    return false;
  }

  if (token) {
    return _AuthServices.verifyToken().pipe(
      map(() => {
        if (isAuthPath) {
          _Router.navigateByUrl('/home');
          return false;
        }
        return true;
      }),
      catchError(() => {
        _AuthServices.clearToken();
        _Router.navigateByUrl('/signin');
        return of(false);
      })
    );
  }

  return true;
};
