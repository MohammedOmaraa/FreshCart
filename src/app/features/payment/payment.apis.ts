import { environments } from '../../../environments/environment';

const BASE = `${environments.BaseURL}orders/`;

export const PaymentApis = {
  /** Create Stripe checkout session */
  OnlinePayment: `${BASE}/checkout-session`,

  /** Cash payment */
  CashPayment: `${BASE}`,
} as const;
