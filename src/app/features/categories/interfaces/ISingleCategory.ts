import { ICategoryData as ICategory } from './IAllCategories';

export interface ISingleCategoryApiRes {
  data: ICategoryData;
}

// same properties
export interface ICategoryData extends ICategory {
  __v: number;
}
