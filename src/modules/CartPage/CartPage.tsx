import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCart } from '../shared/hooks/useCart';
import { Back } from '../shared/components/Back';
import { CartProduct } from './components/CartProduct';

import styles from './CartPage.module.scss';
import { Loader } from '../shared/components/Loader';
import { PageState } from '../shared/components/PageState';

export const CartPage = () => {
  const { cart, totalPrice, clearCart, loading, error } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCheckout = () => {
    setIsModalOpen(true);
  };

  const handleConfirmClear = async () => {
    await clearCart();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getItemsLabel = (count: number) => {
    if (count === 1) return 'товар';
    if (count >= 2 && count <= 4) return 'товари';
    return 'товарів';
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (loading) return <Loader />;

  if (error) {
    return (
      <PageState
        type="error"
        message="Не вдалося завантажити кошик"
        onReload={() => window.location.reload()}
      />
    );
  }

  return (
    <section className={styles.cart}>
      <div className={styles.cart__wrapper}>
        <Back />

        <h1 className={styles.cart__title}>Кошик</h1>

        {!cart.length ? (
          <div className={styles.cart__empty}>
            <div className={styles['cart__empty-wrapper']}>
              <span className={styles['cart__empty-title']}>Ваш кошик порожній</span>

              <p className={styles['cart__empty-description']}>
                Саме час наповнити його улюбленими напоями
              </p>

              <button
                className={styles['cart__checkout-button']}
                onClick={() => navigate('/wines')}
              >
                Перейти до товарів
              </button>
            </div>

            <img
              className={styles['cart__empty-image']}
              src="/images/cart-is-empty.png"
              alt="Empty shopping cart"
            />
          </div>
        ) : (
          <div className={styles.cart__container}>
            <div className={styles.cart__products}>
              {cart.map((product) => (
                <CartProduct key={product.itemId} product={product} />
              ))}
            </div>

            <div className={styles.cart__checkout}>
              <p className={styles['cart__checkout-title']}>${totalPrice}</p>

              <p className={styles['cart__checkout-total-price']}>
                Разом за {totalItems} {getItemsLabel(totalItems)}
              </p>

              <div className={styles['cart__checkout-line']} />

              <button className={styles['cart__checkout-button']} onClick={handleCheckout}>
                Оформити замовлення
              </button>
            </div>
          </div>
        )}

        {isModalOpen && (
          <div className={styles['cart__checkout-modal']}>
            <div className={styles['cart__checkout-modal-content']}>
              <p className={styles['cart__checkout-modal-title']}>
                Оформлення замовлення ще не реалізовано. Бажаєте очистити кошик?
              </p>

              <div className={styles['cart__checkout-modal-actions']}>
                <button
                  className={`${styles['cart__checkout-modal-button']}
                  ${styles['cart__checkout-modal-button--confirm']}`}
                  onClick={handleConfirmClear}
                >
                  Так, очистити
                </button>

                <button
                  className={`${styles['cart__checkout-modal-button']}
                  ${styles['cart__checkout-modal-button--cancel']}`}
                  onClick={handleCancel}
                >
                  Скасувати
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
