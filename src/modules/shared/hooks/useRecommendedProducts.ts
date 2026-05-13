import { useEffect, useState } from 'react';
import type { Product } from '../../../types/Product';
import { getWines } from '../api/wines';

type Options = {
  category?: string;
  wine_type?: string;
  mood?: string;
  excludeId?: number;
};

export const useRecommendedProducts = (options: Options) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!options.category && !options.wine_type && !options.mood) {
      return;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);

    getWines({
      category: options?.category ? [options.category] : undefined,
      wine_type: options?.wine_type ? [options.wine_type] : undefined,
      mood: options?.mood ? [options.mood] : undefined,
      perPage: 5,
    })
      .then(({ products }) => {
        setProducts(
          options.excludeId ? products.filter((p) => p.id !== options.excludeId) : products,
        );
      })
      .finally(() => setLoading(false));
  }, [options.category, options.wine_type, options.mood, options.excludeId]);

  return { products, loading };
};
