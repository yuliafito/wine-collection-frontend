import type { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import type { Product } from '../../../../types/Product';
import styles from './ProductCard.module.scss';
import { useCart } from '../../hooks/useCart';

type Props = {
  product: Product;
  displayType?: 'regular' | 'discount';
};

export const ProductCard: FC<Props> = ({ product }) => {
  const { addToCart, isInCart } = useCart();
  const navigate = useNavigate();
  const isAvailable = product.inStock;

  const handleClick = () => {
    if (isInCart(product.id)) {
      navigate('/cart');
    } else {
      addToCart(product.id, 1);
    }
  };

  return (
    <article className={styles['product-card']} data-out-of-stock={!isAvailable}>
      <div className={styles['product-card__container']}>
        <Link to={`/wines/${product.id}`} className={styles['product-card__link']}>
          <img className={styles['product-card__image']} src={product.image} alt={product.name} />
        </Link>

        <Link className={styles['product-card__title']} to={`/wines/${product.id}`}>
          {product.name}
        </Link>

        <div className={styles['product-card__price']}>
          <span className={styles['product-card__price-discount']}>${product.price}</span>
        </div>

        <div className={styles['product-card__line']}></div>

        <div className={styles['product-card__properties']}>
          <div className={styles['product-card__property']}>
            <span className={styles['product-card__label']}>Об'єм</span>

            <span className={styles['product-card__value']}>{product.volume} л</span>
          </div>
        </div>

        <button
          className={classNames(styles['product-card__button'], {
            [styles['product-card__button--active']]: isInCart(product.id),
          })}
          disabled={!isAvailable}
          onClick={handleClick}
        >
          {isAvailable
            ? isInCart(product.id)
              ? 'В кошику'
              : 'Додати до кошика'
            : 'Немає в наявності'}
        </button>
      </div>
    </article>
  );
};
