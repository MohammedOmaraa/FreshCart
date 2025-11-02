import { ICartData } from './ICart';

export interface IDeleteProductCartRes {
  status: string;
  numOfCartItems: number;
  cartId: string;
  data: ICartData;
}
