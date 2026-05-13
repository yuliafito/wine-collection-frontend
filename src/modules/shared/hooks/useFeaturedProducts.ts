import { useEffect, useState } from 'react';
import type { Product } from '../../../types/Product';
import { getWines } from '../api/wines';

type Options = {
  category?: string;
  wine_type?: string;
  purpose?: string;
  mood?: string;
  limit?: number;
};

export const useFeaturedProducts = (options?: Options) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);

    getWines({
      category: options?.category ? [options.category] : undefined,
      wine_type: options?.wine_type ? [options.wine_type] : undefined,
      purpose: options?.purpose ? [options.purpose] : undefined,
      mood: options?.mood ? [options.mood] : undefined,
      perPage: options?.limit ?? 3,
    })
      .then(({ products }) => {
        setProducts(products);
      })
      .catch(() => {
        setProducts([]);
      })
      .finally(() => setLoading(false));
  }, [options?.category, options?.wine_type, options?.purpose, options?.mood, options?.limit]);

  return { products, loading };
};
