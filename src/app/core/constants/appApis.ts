import { environments } from '../../../environments/environment.dev';

export const AppApis = {
  // Auth
  SignUpURL: `${environments.BaseURL}auth/signup`,
  SignInURL: `${environments.BaseURL}auth/signin`,

  // Products
  AllProductsURL: `${environments.BaseURL}products`,
  SingleProductsURL: `${environments.BaseURL}products`,
} as const;
