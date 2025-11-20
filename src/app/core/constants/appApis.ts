import { environments } from '../../../environments/environment';

const BASE = environments.BaseURL;

export const AppApis = {
  // Products
  AllProductsURL: `${BASE}products`,
  SingleProductsURL: `${BASE}products`,

  // Categories
  AllCategoriesURL: `${BASE}categories`,
  SingleCategoryURL: `${BASE}categories`,
} as const;
