import type { Product } from '../../../types/Product';
import type { WineApi, WineListItemApi } from '../../../types/WineApi';

export const mapWineListItemToProduct = (wine: WineListItemApi): Product => ({
  id: wine.id,
  name: wine.name,
  volume: Number(wine.volume),
  description: '',
  image: wine.image ?? '/mock-images/prestige-chianti-docg.png',
  price: Number(wine.price),

  category: 'classic',
  type: 'red',
  country: '',
  mood: 'romantic',
  purpose: 'celebration',

  categoryId: undefined,
  wineTypeId: undefined,
  moodId: undefined,
  purposeId: undefined,

  inStock: true,
});

export const mapWineToProduct = (wine: WineApi): Product => ({
  id: wine.id,
  name: wine.name,
  volume: Number(wine.volume),
  description: wine.description ?? '',
  image: wine.image ?? '/mock-images/prestige-chianti-docg.png',
  price: Number(wine.price),

  category: wine.category?.name?.toLowerCase() ?? '',

  type: wine.wine_type?.name?.toLowerCase() ?? '',

  country: wine.country?.name ?? '',

  inStock: wine.in_stock,

  mood: wine.moods?.[0]?.name?.toLowerCase() ?? '',

  purpose: wine.purpose?.name?.toLowerCase()?.replace(/\s+/g, ' ') ?? '',

  categoryId: wine.category ? String(wine.category.id) : undefined,
  wineTypeId: wine.wine_type ? String(wine.wine_type.id) : undefined,
  moodId: wine.moods?.[0] ? String(wine.moods[0].id) : undefined,
  purposeId: wine.purpose ? String(wine.purpose.id) : undefined,
});
