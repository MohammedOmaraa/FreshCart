import { Routes } from '@angular/router';

export const BRANDS_Routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/brands-page/brands-page').then((c) => c.BrandsPage),
  },
];
