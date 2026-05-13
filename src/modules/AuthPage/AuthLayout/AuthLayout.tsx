import styles from './AuthLayout.module.scss';

interface Props {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className={styles.auth}>
      <div className={styles.auth__wrapper}>
        <div className={styles.auth__form}>{children}</div>

        <div className={styles.auth__image} />
      </div>
    </div>
  );
};
