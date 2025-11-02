import { environments } from '../../../environments/environment.dev';

const BASE = `${environments.BaseURL}cart/`;

export const CartApi = {
  /** get user cart */
  Get: BASE,

  /** add product to cart */
  Add: BASE,

  /** update product count */
  Update: (id: string) => `${BASE}${id}`,

  /** delete product from cart */
  Delete: (id: string) => `${BASE}${id}`,

  /** claer cart */
  Clear: BASE,
} as const;
