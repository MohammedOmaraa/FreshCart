import { Routes } from '@angular/router';

export const PAYMENT_ROUTES: Routes = [
  {
    path: ':cartId',
    loadComponent: () =>
      import('./pages/checkout-page/checkout-page').then((c) => c.CheckoutPage),
  },
];
