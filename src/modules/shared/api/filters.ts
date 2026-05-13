import type { FilterItem } from '../../../types/FilterItem';
import { request } from './http';

type ApiFilterItem = {
  id: number;
  name: string;
};

type PaginatedResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

const mapFilterItems = (items: ApiFilterItem[]): FilterItem[] =>
  items.map((item) => ({
    id: String(item.id),
    name: item.name,
  }));

const getFilterList = async (endpoint: string): Promise<FilterItem[]> => {
  const res = await request<PaginatedResponse<ApiFilterItem>>(endpoint);
  return mapFilterItems(res.results);
};

export const getMoods = () => getFilterList('/moods/');
export const getPurposes = () => getFilterList('/purposes/');
export const getCategories = () => getFilterList('/categories/');
export const getCountries = () => getFilterList('/countries/');
export const getWineTypes = () => getFilterList('/wine-types/');
