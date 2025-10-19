export interface IAllCategoriesApiRes {
  results: number;
  metadata: Metadata;
  data: ICategoryData[];
}


export interface ICategoryData {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
}
