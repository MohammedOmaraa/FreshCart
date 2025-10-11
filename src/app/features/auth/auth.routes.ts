import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full',
  },
  {
    path: 'signin',
    loadComponent: () => import('./pages/signin/signin').then((c) => c.Signin),
  },
  {
    path: 'signup',
    loadComponent: () => import('./pages/signup/signup').then((c) => c.Signup),
  },
];
