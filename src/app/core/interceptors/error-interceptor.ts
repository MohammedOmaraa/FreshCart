import { inject } from '@angular/core';
import { ErrorHandlerService } from '../services/error-handler.service';
import { HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { Observable } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (
  req,
  next
): Observable<HttpEvent<any>> => {
  const errorService = inject(ErrorHandlerService);

  return next(req).pipe(errorService.handleHttpError(req.url));
};
