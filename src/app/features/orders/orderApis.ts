import { environments } from '../../../environments/environment';

const BASE = `${environments.BaseURL}orders/`;

export const OrderApis = {
  /** get user all orders */
  GetUserOrders: (userId: string) => `${BASE}user/${userId}`,
} as const;
