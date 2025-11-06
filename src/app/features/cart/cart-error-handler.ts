import { HttpErrorResponse } from '@angular/common/http';
import { FeatureErrorHandler } from '../../core/interfaces/error-handler.interface';

export const CartErrorHandler: FeatureErrorHandler = {
  match: (url: string) => url.includes('/cart'),

  map: (error: HttpErrorResponse): string | null => {
    const message = error.error?.message || '';

    if (message.includes('No Product Cart item found for this id')) {
      return 'This product does not exist';
    }

    if (message.includes('Cast to ObjectId failed')) {
      return 'Invalid product ID';
    }

    return null;
  },
};
