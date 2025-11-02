export interface ICartData {
  _id: string;
  cartOwner: string;
  products: IProduct[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
}

export interface IProduct {
  count: number;
  _id: string;
  product: IProductDetails;
  price: number;
}

interface IProductDetails {
  subcategory: ISubcategory[];
  _id: string;
  title: string;
  quantity: number;
  imageCover: string;
  category: ICategory;
  brand: IBrand;
  ratingsAverage: number;
  id: string;
}

interface ICategory {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

interface IBrand extends ICategory {}

interface ISubcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}
