export interface ISingleProductApiRes {
  data: ISingleProduct;
}

export interface ISingleProduct {
  sold: null | number;
  images: string[];
  subcategory: ISubcategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  category: ICategory;
  brand: IBrand;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  reviews: any[];
  id: string;
}

export interface ISubcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

// same properties
export interface IBrand extends ICategory {}
