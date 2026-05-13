import { Link } from 'react-router-dom';
import styles from './Orders.module.scss';

export const Orders = () => {
  return (
    <section className={styles.orders}>
      <h2 className={styles.orders__title}>Замовлення</h2>

      <div className={styles.orders__empty}>
        <p className={styles.orders__text}>У вас ще не було замовлень</p>

        <Link to="/wines" className={styles.orders__button}>
          Перейти до товарів
        </Link>
      </div>
    </section>
  );
};
