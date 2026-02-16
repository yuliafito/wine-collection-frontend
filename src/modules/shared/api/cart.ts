import { request } from './http';
import { getCartId, setCartId, clearCartId } from '../utils/cart';

import {
  getCartMock,
  addToCartMock,
  updateQuantityMock,
  removeOneMock,
  clearCartMock,
} from '../mocks/cartApi';

export type CartItemApi = {
  id: number;
  wine_id: number;
  wine_name: string;
  wine_price: string;
  quantity: number;
  subtotal: number;
  wine_image?: string;
};

export type CartApiResponse = {
  id: string | null;
  items: CartItemApi[];
  total_price: number;
};

type AddToCartBody = {
  wine: number;
  quantity: number;
  cart_id?: string;
};

const USE_MOCKS = false;

export const getCartApi = async (): Promise<CartApiResponse> => {
  if (USE_MOCKS) {
    return getCartMock();
  }

  const cartId = getCartId();
  const query = cartId ? `?cart_id=${cartId}` : '';

  const data = await request<CartApiResponse>(`/cart/${query}`);

  if (data.id && data.id !== cartId) {
    setCartId(data.id);
  }

  return data;
};

export const addToCartApi = async (wine: number, quantity = 1): Promise<CartApiResponse> => {
  if (USE_MOCKS) {
    return addToCartMock(wine, quantity);
  }

  const cartId = getCartId();

  const body: AddToCartBody = { wine, quantity, ...(cartId ? { cart_id: cartId } : {}) };

  const data = await request<CartApiResponse>('/cart/add_item/', {
    method: 'POST',
    body: JSON.stringify(body),
  });

  if (data.id) setCartId(data.id);

  return data;
};

export const updateQuantityApi = async (
  wine_id: number,
  quantity: number,
): Promise<CartApiResponse> => {
  if (USE_MOCKS) {
    return updateQuantityMock(wine_id, quantity);
  }

  const cartId = getCartId();
  if (!cartId) {
    throw new Error('No cart id');
  }

  return request<CartApiResponse>('/cart/update_quantity/', {
    method: 'PATCH',
    body: JSON.stringify({
      cart_id: cartId,
      wine_id,
      quantity,
    }),
  });
};

export const removeOneApi = async (wine_id: number): Promise<CartApiResponse> => {
  if (USE_MOCKS) {
    return removeOneMock(wine_id);
  }

  const cartId = getCartId();
  if (!cartId) {
    throw new Error('No cart id');
  }

  return request<CartApiResponse>(`/cart/remove-one/?cart_id=${cartId}&wine_id=${wine_id}`, {
    method: 'DELETE',
  });
};

export const clearCartApi = async (): Promise<void> => {
  if (USE_MOCKS) {
    return clearCartMock();
  }

  const cartId = getCartId();
  if (!cartId) return;

  await request(`/cart/clear/?cart_id=${cartId}`, {
    method: 'DELETE',
  });

  clearCartId();
};

export const mergeCartApi = async (): Promise<void> => {
  if (USE_MOCKS) return;

  const cartId = getCartId();
  if (!cartId) return;

  await request('/cart/merge_unauthorized_cart_to_user/', {
    method: 'POST',
    body: JSON.stringify({ cart_id: cartId }),
  });

  clearCartId();
};
