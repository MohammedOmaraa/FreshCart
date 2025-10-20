import { Routes } from '@angular/router';

export const PRODUCTS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/products-page/products-page').then((c) => c.ProductsPage),
  },
  {
    path: 'details/:productId/:slug',
    loadComponent: () =>
      import('./pages/product-details/product-details').then(
        (c) => c.ProductDetails
      ),
  },
];
