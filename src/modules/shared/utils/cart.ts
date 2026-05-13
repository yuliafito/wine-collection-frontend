const CART_ID_KEY = 'cart_id';

export const getCartId = () => {
  return localStorage.getItem(CART_ID_KEY);
};

export const setCartId = (id: string) => {
  localStorage.setItem(CART_ID_KEY, id);
};

export const clearCartId = () => {
  localStorage.removeItem(CART_ID_KEY);
};
