import { useEffect, useState } from 'react';
import type { Product } from '../../../types/Product';
import { getWineById } from '../api/wines';

export const useProduct = (id?: number) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    setError(false);

    getWineById(id)
      .then(setProduct)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  return { product, loading, error };
};
