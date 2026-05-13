import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import { Icon } from '../Icon';

export const Footer = () => {
  return (
    <footer id="contacts" className={styles.footer}>
      <div className={styles.footer__wrapper}>
        <div className={styles.footer__content}>
          <div className={styles.footer__about}>
            <div className={styles['footer__about-wrapper']}>
              <Link to="/" className={styles['footer__logo-wrapper']}>
                <img src="/logo.svg" alt="Logo" className={styles.footer__logo} />
              </Link>

              <p className={styles['footer__about-text']}>
                Wine Collection — онлайн-каталог вин з персональними рекомендаціями для будь-якої
                події та настрою.
              </p>
            </div>
          </div>

          <div className={styles.footer__contacts}>
            <a
              className={styles['footer__contact-link']}
              href="https://www.google.com/maps/place/Ukraine"
              target="_blank"
              rel="noreferrer"
            >
              Ukraine
            </a>

            <a className={styles['footer__contact-link']} href="mailto:support.mountain@gmail.com">
              support.winecollection@gmail.com
            </a>

            <a className={styles['footer__contact-link']} href="tel:+380934476839">
              +380 93 447 68 39
            </a>
          </div>
        </div>

        <div className={styles.footer__bottom}>
          <span className={styles.footer__copyright}>
            © 2026 Wine collection. Усі права захищені.
          </span>

          <div
            className={styles['footer__back-to-top']}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <Icon name="arrow_up" />
          </div>
        </div>
      </div>
    </footer>
  );
};
