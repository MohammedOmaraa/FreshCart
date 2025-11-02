import { ICartData } from './ICart';

export interface IUpdateProductCartRes {
  status: string;
  numOfCartItems: number;
  cartId: string;
  data: ICartData;
}
