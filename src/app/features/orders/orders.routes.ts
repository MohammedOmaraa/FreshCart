import { Routes } from '@angular/router';

export const ORDERS_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'all',
    pathMatch: 'full',
  },
  {
    path: 'all',
    loadComponent: () =>
      import('./pages/all-orders/all-orders').then((c) => c.AllOrders),
  },
];
