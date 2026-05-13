import { useEffect, useState } from 'react';
import type { Product } from '../../../types/Product';
import { getWines } from '../api/wines';
import type { ProductsParams } from '../../../types/ProductsParams';

export const useProducts = (params: ProductsParams) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    setError(false);

    getWines(params)
      .then(({ products, total }) => {
        setProducts(products);
        setTotal(total);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [params]);

  return { products, total, loading, error };
};
