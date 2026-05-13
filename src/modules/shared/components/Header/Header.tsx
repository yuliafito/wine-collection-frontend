import { Link, NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import cn from 'classnames';
import { desktopNavLinks } from '../../constants/navLinks';
import { isAuthenticated } from '../../utils/auth';
import { useCart } from '../../hooks/useCart';
import { Icon } from '../Icon';
import { Menu } from '../Menu';
import styles from './Header.module.scss';

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  const header = document.querySelector('header');

  if (!element) return;

  const offset = header?.offsetHeight ?? 0;
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth',
  });
};

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const isAuth = isAuthenticated();

  const { cart } = useCart();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <header className={styles.header}>
        <div className={styles['header__top-bar']}>
          <Link to="/" className={styles['header__logo-container']}>
            <img src={'/logo.svg'} alt={'Logo'} className={styles.header__logo} />
          </Link>

          <nav className={styles.header__nav}>
            <ul className={styles.header__list}>
              {desktopNavLinks
                .filter((link) => !link.onlyHome || isHomePage)
                .map((link) =>
                  link.type === 'route' ? (
                    <NavLink
                      key={link.title}
                      to={link.path}
                      className={({ isActive }) =>
                        cn(styles.header__link, {
                          [styles['header__link--active']]: isActive,
                        })
                      }
                    >
                      {link.title}
                    </NavLink>
                  ) : (
                    <button
                      key={link.title}
                      type="button"
                      className={styles.header__link}
                      onClick={() => scrollToSection(link.path.replace('#', ''))}
                    >
                      {link.title}
                    </button>
                  ),
                )}
            </ul>
          </nav>

          <div className={styles['header__icons-wrapper']}>
            <div className={styles['header__icon-container']} onClick={toggleMenu}>
              <Icon name={isMenuOpen ? 'close' : 'menu'} />
            </div>
          </div>

          <div className={styles['header__icons-container']}>
            <NavLink
              to={isAuth ? '/account' : '/auth'}
              className={({ isActive }) =>
                cn(styles['header__icon'], {
                  [styles['header__icon--active']]: isActive,
                })
              }
            >
              <Icon name="account" />
            </NavLink>

            <NavLink
              to="/cart"
              className={({ isActive }) =>
                cn(styles['header__icon'], {
                  [styles['header__icon--active']]: isActive,
                })
              }
            >
              <div className={styles['header__icon-wrapper']}>
                <Icon name="cart" />

                {cartCount > 0 && <span className={styles['header__counter']}>{cartCount}</span>}
              </div>
            </NavLink>
          </div>
        </div>
      </header>

      <Menu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
    </>
  );
};
