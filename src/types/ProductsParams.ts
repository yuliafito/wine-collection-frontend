export type ProductsParams = {
  query?: string;
  sort?: string;
  page?: number;
  perPage?: number;

  mood?: string[];
  wine_type?: string[];
  country?: string[];
  purpose?: string[];
  category?: string[];

  priceMin?: string;
  priceMax?: string;
};
