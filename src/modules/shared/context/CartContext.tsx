import { createContext } from 'react';

export type CartItem = {
  itemId: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export type CartContextType = {
  cart: CartItem[];
  totalPrice: number;
  loading: boolean;
  error: boolean;

  addToCart: (productId: number, quantity?: number) => Promise<void>;
  removeItemCompletely: (productId: number) => Promise<void>;
  removeOne: (productId: number) => Promise<void>;
  changeQuantity: (productId: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  isInCart: (productId: number) => boolean;
};

export const CartContext = createContext<CartContextType | undefined>(undefined);
