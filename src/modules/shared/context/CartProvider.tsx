import { useEffect, useState } from 'react';
import { CartContext, type CartItem } from '../context/CartContext';
import {
  getCartApi,
  addToCartApi,
  updateQuantityApi,
  removeOneApi,
  clearCartApi,
  type CartItemApi,
} from '../api/cart';

const mapApiItemToCartItem = (item: CartItemApi): CartItem => ({
  itemId: item.wine_id,
  name: item.wine_name,
  price: Number(item.wine_price),
  quantity: item.quantity,
  image: item.wine_image ?? '/mock-images/prestige-chianti-docg.png',
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const syncCart = (data: { items: CartItemApi[]; total_price: number }) => {
    setCart(data.items.map(mapApiItemToCartItem));
    setTotalPrice(data.total_price);
  };

  useEffect(() => {
    const init = async () => {
      setError(false);

      try {
        const data = await getCartApi();
        syncCart(data);
      } catch (e) {
        console.error('Cart load error:', e);
        setError(true);
        setCart([]);
        setTotalPrice(0);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const addToCart = async (wineId: number, quantity = 1) => {
    const data = await addToCartApi(wineId, quantity);
    syncCart(data);
  };

  const changeQuantity = async (wineId: number, quantity: number) => {
    if (quantity < 1) return;
    const data = await updateQuantityApi(wineId, quantity);
    syncCart(data);
  };

  const removeOne = async (wineId: number) => {
    const data = await removeOneApi(wineId);
    syncCart(data);
  };

  const removeItemCompletely = async (wineId: number) => {
    const item = cart.find((i) => i.itemId === wineId);
    if (!item) return;

    for (let i = 0; i < item.quantity; i++) {
      await removeOneApi(wineId);
    }

    const data = await getCartApi();
    syncCart(data);
  };

  const clearCart = async () => {
    await clearCartApi();
    setCart([]);
    setTotalPrice(0);
  };

  const isInCart = (productId: number) => cart.some((item) => item.itemId === productId);

  return (
    <CartContext.Provider
      value={{
        cart,
        totalPrice,
        loading,
        error,
        addToCart,
        removeItemCompletely,
        removeOne,
        changeQuantity,
        clearCart,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
