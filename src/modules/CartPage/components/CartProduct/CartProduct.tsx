import type { FC } from 'react';
import { Link } from 'react-router-dom';

import { Icon } from '../../../shared/components/Icon/Icon';
import { IconButton } from '../../../shared/components/IconButton';
import { type CartItem } from '../../../shared/context/CartContext';
import { useCart } from '../../../shared/hooks/useCart';

import styles from './CartProduct.module.scss';

type Props = {
  product: CartItem;
};

export const CartProduct: FC<Props> = ({ product }) => {
  const { removeItemCompletely, removeOne, changeQuantity } = useCart();

  return (
    <article className={styles['cart-product']}>
      <div className={styles['cart-product__info']}>
        <button
          className={styles['cart-product__button']}
          onClick={() => removeItemCompletely(product.itemId)}
        >
          <Icon name="close" className={styles['cart-product__icon-close']} />
        </button>

        <Link to={`/wine/${product.itemId}`} className={styles['cart-product__link']}>
          <img className={styles['cart-product__image']} src={product.image} alt={product.name} />
        </Link>

        <Link className={styles['cart-product__title']} to={`/wine/${product.itemId}`}>
          {product.name}
        </Link>
      </div>

      <div className={styles['cart-product__controls']}>
        <div className={styles['cart-product__buttons']}>
          <IconButton
            icon="minus"
            onClick={() => removeOne(product.itemId)}
            disabled={product.quantity === 1}
          />

          <div className={styles['cart-product__count']}>{product.quantity}</div>

          <IconButton
            icon="plus"
            onClick={() => changeQuantity(product.itemId, product.quantity + 1)}
          />
        </div>

        <span className={styles['cart-product__price']}>${product.price * product.quantity}</span>
      </div>
    </article>
  );
};
