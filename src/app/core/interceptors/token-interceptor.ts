import { isPlatformBrowser } from '@angular/common';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { toast } from 'ngx-sonner';

// Endpoints need token
const protectedEndpoints = [
  '/users/changeMyPassword',
  '/users/updateMe',
  '/auth/verifyToken',
  '/wishlist',
  '/addresses',
  '/cart',
  '/orders/checkout-session',
];

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  const router = inject(Router);

  // if req on server
  if (!isPlatformBrowser(platformId)) {
    return next(req);
  }

  const url = req.url;

  // special case /orders/<id> need token
  const isOrderById = /\/orders\/[a-zA-Z0-9]+$/.test(url);

  const isProtected = protectedEndpoints.some((endpoint) =>
    url.includes(endpoint)
  );

  if (!isProtected && !isOrderById) {
    return next(req);
  }

  const token = localStorage.getItem('token');

  if (token) {
    const cloned = req.clone({
      setHeaders: { token },
    });
    return next(cloned);
  }

  toast.error('Unauthorized User ', { description: 'Login Again' });
  // if token not exist and req need token
  router.navigate(['/signin']);

  return throwError(
    () =>
      new HttpErrorResponse({
        status: 401,
        statusText: 'Unauthorized - Missing Token',
        url: req.url,
        error: { message: 'Unauthorized User.' },
      })
  );
};
