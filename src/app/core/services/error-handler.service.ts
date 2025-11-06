import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { catchError, OperatorFunction, throwError } from 'rxjs';
import { CartErrorHandler } from '../../features/cart/cart-error-handler';

@Injectable({ providedIn: 'root' })
export class ErrorHandlerService {
  private readonly handlers = [CartErrorHandler];

  handleHttpError(
    url: string
  ): OperatorFunction<HttpEvent<any>, HttpEvent<any>> {
    return catchError((error: HttpErrorResponse) => {
      let message!: string;
      const handler = this.handlers.find((h) => h.match(url));
      let customFeatureMessage: string | null = null;

      // Feature custom error
      if (handler) {
        customFeatureMessage = handler.map(error);
      }

      if (customFeatureMessage) {
        message = customFeatureMessage;
      }
      // Handle global HTTP errors
      else {
        switch (error.status) {
          case 0:
            message = 'Failed to connect to the server';
            break;
          case 400:
            message = 'Bad Request';
            break;
          case 401:
            message = 'Unauthorized';
            break;
          case 403:
            message = 'Forbidden';
            break;
          case 404:
            message = 'Resource not found';
            break;
          case 408:
            message = 'Request Timeout';
            break;
          case 500:
            message = 'Internal Server Error';
            break;
          case 502:
            message = 'Bad Gateway';
            break;
          case 503:
            message = 'Service Unavailable';
            break;
          default:
            message = 'An unexpected error occurred';
        }
      }

      console.log(message);
      return throwError(() => error);
    });
  }
}
