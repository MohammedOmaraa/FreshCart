import { environments } from '../../../environments/environment.dev';

const BASE = environments.BaseURL;

export const AppApis = {
  // Auth
  SignUpURL: `${BASE}auth/signup`,
  SignInURL: `${BASE}auth/signin`,

  // Products
  AllProductsURL: `${BASE}products`,
  SingleProductsURL: `${BASE}products`,

  // Categories
  AllCategoriesURL: `${BASE}categories`,
  SingleCategoryURL: `${BASE}categories`,

} as const;
