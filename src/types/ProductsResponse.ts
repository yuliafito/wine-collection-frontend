import type { Product } from './Product';

export type ProductsResponse = {
  products: Product[];
  total: number;
};
