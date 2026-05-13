import type { User } from '../../../../types/User';
import styles from './Details.module.scss';

type Props = {
  user: User;
  onEdit: () => void;
};

export const DetailsView = ({ user, onEdit }: Props) => {
  return (
    <section className={styles.details}>
      <h2 className={styles.details__title}>Особисті дані</h2>

      <div className={styles.details__list}>
        <div className={styles.details__row}>
          <span>Імʼя</span>

          <span className={styles.details__value}>{user.first_name}</span>
        </div>

        <div className={styles.details__row}>
          <span>Прізвище</span>

          <span className={styles.details__value}>{user.last_name}</span>
        </div>

        <div className={styles.details__row}>
          <span>Email</span>

          <span className={styles.details__value}>{user.email}</span>
        </div>

        <div className={styles.details__row}>
          <span>Телефон</span>

          <span className={styles.details__value}>{user.phone}</span>
        </div>

        {user.birth_date && (
          <div className={styles.details__row}>
            <span>Дата народження</span>

            <span className={styles.details__value}>
              {new Date(user.birth_date).toLocaleDateString('uk-UA')}
            </span>
          </div>
        )}
      </div>

      <button className={styles.details__button} onClick={onEdit}>
        Редагувати
      </button>
    </section>
  );
};
