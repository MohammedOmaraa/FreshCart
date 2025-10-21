import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const _Router = inject(Router);
  const platformId = inject(PLATFORM_ID);
  const isBrowser = isPlatformBrowser(platformId);

  let token: string | null = null;

  if (!isBrowser) {
    return true;
  }
  token = localStorage.getItem('token');

  // if user at auth pages signin or signup
  const isAuthPath =
    state.url.startsWith('/signin') || state.url.startsWith('/signup');

  if (token && isAuthPath) {
    _Router.navigateByUrl('/home');
    return false;
  }

  if (!token && !isAuthPath) {
    _Router.navigateByUrl('/signin');
    return false;
  }

  return true;
};
