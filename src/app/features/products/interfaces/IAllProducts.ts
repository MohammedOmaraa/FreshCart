import {
  ICategory as ProductCategory,
  IBrand as ProductBrand,
  ISubcategory as ProductSubcategory,
} from './ISingleProduct';

export interface IAllProductsApiRes {
  results: number;
  metadata: IMetadata;
  data: IProduct[];
}

export interface IProduct {
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
  id: string;
  priceAfterDiscount?: number;
  availableColors?: any[];
}

interface IMetadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage: number;
}

// same properties
interface ICategory extends ProductCategory {}
interface IBrand extends ProductBrand {}
interface ISubcategory extends ProductSubcategory {}
