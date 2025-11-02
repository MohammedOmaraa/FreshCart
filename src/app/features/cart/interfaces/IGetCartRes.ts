import { ICartData } from './ICart';

export interface IGetCartRes {
  status: string;
  numOfCartItems: number;
  cartId: string;
  data: ICartData;
}
