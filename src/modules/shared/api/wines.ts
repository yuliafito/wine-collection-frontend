import type { Product } from '../../../types/Product';
import type { ProductsParams } from '../../../types/ProductsParams';
import type { ProductsResponse } from '../../../types/ProductsResponse';
import type { WineApi, WinesListApiResponse } from '../../../types/WineApi';
import { request } from './http';
import { mapWineListItemToProduct, mapWineToProduct } from './mapWineToProduct';

export const getWines = async (params: ProductsParams): Promise<ProductsResponse> => {
  let ordering = 'price';

  if (params.sort === 'price_asc') ordering = 'price';
  if (params.sort === 'price_desc') ordering = '-price';
  if (params.sort === 'name_asc') ordering = 'name';
  if (params.sort === 'name_desc') ordering = '-name';

  const query = new URLSearchParams();

  if (params.query) query.set('name', params.query);

  if (params.priceMin) query.set('min_price', params.priceMin);
  if (params.priceMax) query.set('max_price', params.priceMax);

  params.mood?.forEach((id) => query.append('mood', id));
  params.wine_type?.forEach((id) => query.append('wine_type', id));
  params.purpose?.forEach((id) => query.append('purpose', id));
  params.category?.forEach((id) => query.append('category', id));
  params.country?.forEach((id) => query.append('country', id));

  query.set('ordering', ordering);
  query.set('limit', String(params.perPage || 8));
  query.set(
    'offset',
    String(params.page && params.perPage ? (params.page - 1) * params.perPage : 0),
  );

  const data = await request<WinesListApiResponse>(`/wines/?${query.toString()}`);

  return {
    products: data.results.map(mapWineListItemToProduct),
    total: data.count,
  };
};

export const getWineById = async (id: number): Promise<Product> => {
  const data = await request<WineApi>(`/wines/${id}/`);
  return mapWineToProduct(data);
};
