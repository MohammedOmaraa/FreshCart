import { Routes } from '@angular/router';
import { AuthLayout } from './core/layouts/auth-layout/auth-layout';
import { MainLayout } from './core/layouts/main-layout/main-layout';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayout,
    loadChildren: () =>
      import('./features/auth/auth.routes').then((r) => r.AUTH_ROUTES),
  },
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./features/home/home.routes').then((r) => r.HOME_ROUTES),
      },
      {
        path: 'cart',
        loadChildren: () =>
          import('./features/cart/cart.routes').then((r) => r.CART_ROUTES),
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./features/products/products.routes').then(
            (r) => r.PRODUCTS_ROUTES
          ),
      },
      {
        path: 'categories',
        loadChildren: () =>
          import('./features/categories/categories.routes').then(
            (r) => r.CATEGORIES_ROUTES
          ),
      },
      {
        path: 'brands',
        loadChildren: () =>
          import('./features/brands/brands.routes').then(
            (r) => r.BRANDS_Routes
          ),
      },
    ],
  },
];
