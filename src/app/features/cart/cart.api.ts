import { environments } from '../../../environments/environment';

const BASE = `${environments.BaseURL}cart`;

export const CartApi = {
  /** Endpoint to get the current user's cart */
  Get: BASE,

  /** Endpoint to add a product to the cart */
  Add: BASE,

  /**
   * Endpoint to update the quantity of a product in the cart
   * @param id - The ID of the product to update
   */
  Update: (id: string) => `${BASE}${id}`,

  /**
   * Endpoint to delete a product from the cart
   * @param id - The ID of the product to delete
   */
  Delete: (id: string) => `${BASE}${id}`,

  /** Endpoint to clear the entire cart */
  Clear: BASE,
} as const;
