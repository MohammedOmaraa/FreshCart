import { ICartData } from "./ICart";

export interface IAddProductCartRes {
  status: string;
  message: string;
  numOfCartItems: number;
  cartId: string;
  data: ICartData;
}
