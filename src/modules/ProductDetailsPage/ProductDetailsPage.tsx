import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { useProduct } from '../shared/hooks/useProduct';
import { useCart } from '../shared/hooks/useCart';
import { useRecommendedProducts } from '../shared/hooks/useRecommendedProducts';

import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { Back } from '../shared/components/Back';
import { Icon } from '../shared/components/Icon';
import { Loader } from '../shared/components/Loader';
import { ProductCard } from '../shared/components/ProductCard';
import { NotFound } from '../shared/components/NotFound';
import { PageState } from '../shared/components/PageState';

import styles from './ProductDetailsPage.module.scss';
import { useFilters } from '../shared/hooks/useFilters';

export const ProductDetailsPage = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const { addToCart, isInCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const { product, loading, error } = useProduct(Number(itemId));

  const navigate = useNavigate();

  const { products: recommended, loading: recLoading } = useRecommendedProducts({
    category: product?.categoryId,
    wine_type: product?.wineTypeId,
    mood: product?.moodId,
    excludeId: product?.id,
  });

  const { moods, purposes, categories, countries, wineTypes } = useFilters();

  const labelMap = useMemo(() => {
    const map: Record<string, Record<string, string>> = {};

    const fill = (key: string, items: { id: string; name: string }[]) => {
      map[key] = {};
      items.forEach((item) => {
        map[key][item.id] = item.name;
      });
    };

    fill('mood', moods);
    fill('purpose', purposes);
    fill('category', categories);
    fill('country', countries);
    fill('wine_type', wineTypes);

    return map;
  }, [moods, purposes, categories, countries, wineTypes]);

  const getLabel = (key: string, value?: string) => {
    if (!value) return '—';
    return labelMap[key]?.[value] ?? value;
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [itemId]);

  const getShortDescription = (description: string, sentencesCount = 2) => {
    const textLines = description
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line && !line.endsWith(':'));

    if (!textLines.length) return '';

    const sentences = textLines[0].split('. ');

    return (
      sentences.slice(0, sentencesCount).join('. ') + (sentences.length > sentencesCount ? '.' : '')
    );
  };

  const handleCartClick = () => {
    if (!product) return;

    if (isInCart(product.id)) {
      navigate('/cart');
    } else {
      addToCart(product.id, quantity);
    }
  };

  if (loading) return <Loader />;

  if (error) {
    return <PageState type="error" message="Щось пішло не так" />;
  }

  if (!product) {
    return (
      <NotFound
        title="Товар не знайдено"
        imageSrc="/images/product-not-found.png"
        alt="Product was not found"
      />
    );
  }

  const isAvailable = product.inStock;

  return (
    <section className={styles['product-details']}>
      <div className={styles['product-details__wrapper']}>
        <Breadcrumbs firstPath="wines" secondPath={product.name} />

        <Back />

        <div className={styles['product-details__main']}>
          <div className={styles['product-details__main-info']}>
            <div className={styles['product-details__images-container']}>
              <div className={styles['product-details__images-column']}>
                <div
                  className={classNames(
                    styles['product-details__image-container'],
                    styles['product-details__image-container--active'],
                  )}
                >
                  <img
                    className={styles['product-details__image']}
                    src={product.image}
                    alt={product.name}
                  />
                </div>
              </div>

              <div className={styles['product-details__main-image-container']}>
                <img
                  className={styles['product-details__main-image']}
                  src={product.image}
                  alt={product.name}
                />
              </div>
            </div>

            <div className={styles['product-details__content']}>
              <h1 className={styles['product-details__title']}>
                {product.name}, {product.volume} л
              </h1>

              <p className={styles['product-details__short-description']}>
                {getShortDescription(product.description)}
              </p>

              <div className={styles['product-details__purchase']}>
                <span className={styles['product-details__price']}>{product.price}₴</span>

                <div className={styles['product-details__actions']}>
                  <div className={styles['product-details__controls']}>
                    <div className={styles['product-details__buttons']}>
                      <button
                        className={classNames(styles['product-details__icon-button'], {
                          [styles.disabled]: quantity === 1,
                        })}
                        disabled={quantity === 1}
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      >
                        <Icon name="minus" />
                      </button>

                      <div className={styles['product-details__count']}>{quantity}</div>

                      <button
                        className={classNames(styles['product-details__icon-button'])}
                        onClick={() => setQuantity((q) => q + 1)}
                      >
                        <Icon name="plus" />
                      </button>
                    </div>
                  </div>

                  <button
                    className={classNames(styles['product-details__button'], {
                      [styles['product-details__button--active']]: isInCart(product.id),
                    })}
                    disabled={!isAvailable}
                    onClick={handleCartClick}
                  >
                    {' '}
                    {isAvailable
                      ? isInCart(product.id)
                        ? 'В кошику'
                        : 'Додати до кошика'
                      : 'Немає в наявності'}{' '}
                  </button>
                </div>
              </div>

              <div className={styles['product-details__characteristics']}>
                <h2 className={styles['product-details__characteristics-title']}>Характеристики</h2>

                <div className={styles['product-details__characteristics-wrapper']}>
                  <ul className={styles['product-details__characteristics-list']}>
                    <li className={styles['product-details__characteristics-list-item']}>
                      <span>Країна</span>

                      <span>{getLabel('country', product.country)}</span>
                    </li>

                    <li className={styles['product-details__characteristics-list-item']}>
                      <span>Обʼєм</span>

                      <span>{product.volume} л</span>
                    </li>

                    <li className={styles['product-details__characteristics-list-item']}>
                      <span>Тип вина</span>

                      <span>{getLabel('wine_type', product.type)}</span>
                    </li>

                    <li className={styles['product-details__characteristics-list-item']}>
                      <span>Настрій</span>

                      <span>{getLabel('mood', product.mood)}</span>
                    </li>

                    <li className={styles['product-details__characteristics-list-item']}>
                      <span>Призначення</span>

                      <span>{getLabel('purpose', product.purpose)}</span>
                    </li>

                    <li className={styles['product-details__characteristics-list-item']}>
                      <span>Категорія</span>

                      <span>{getLabel('category', product.category)}</span>
                    </li>

                    <li className={styles['product-details__characteristics-list-item']}>
                      <span>Наявність</span>

                      <span>{product.inStock ? 'В наявності' : 'Немає'}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className={styles['product-details__main-info']}>
            <div className={styles['product-details__description-wrapper']}>
              <h2 className={styles['product-details__description-title']}>Опис</h2>

              <div className={styles['product-details__description']}>
                {product.description.split('\n').map((line, i) => {
                  const isTitle = line.trim().endsWith(':');

                  return (
                    <p
                      key={i}
                      className={
                        isTitle
                          ? styles['product-details__description-subtitle']
                          : styles['product-details__description-text']
                      }
                    >
                      {line}
                    </p>
                  );
                })}
              </div>
            </div>

            {recommended.length > 0 && (
              <div className={styles['product-details__recommendations']}>
                <h2 className={styles['product-details__recommendations-title']}>
                  Рекомендовані товари
                </h2>

                {recLoading ? (
                  <Loader />
                ) : (
                  <div className={styles['product-details__products']}>
                    {recommended.slice(0, 6).map((product) => (
                      <div className={styles['product-details__products-item']} key={product.id}>
                        <ProductCard product={product} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
