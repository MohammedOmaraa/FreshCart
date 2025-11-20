export interface IShippingAddress {
  shippingAddress: ShippingAddress;
}

interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}
