import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import cn from 'classnames';
import { mobileNavLinks } from '../../constants/navLinks';
import styles from './Menu.module.scss';

type MenuProps = {
  isMenuOpen: boolean;
  toggleMenu: () => void;
};

export const Menu: React.FC<MenuProps> = ({ isMenuOpen, toggleMenu }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const filteredLinks = mobileNavLinks.filter((link) => !link.onlyHome || isHomePage);

  return (
    <aside
      className={cn(styles.menu, {
        [styles['menu--open']]: isMenuOpen,
      })}
    >
      <nav className={styles.menu__nav}>
        <ul className={styles.menu__list}>
          {filteredLinks.map((link) => (
            <React.Fragment key={link.title}>
              {link.type === 'route' ? (
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    cn(styles.menu__link, {
                      [styles['menu__link--active']]: isActive,
                    })
                  }
                  onClick={toggleMenu}
                >
                  {link.title}
                </NavLink>
              ) : (
                <a href={link.path} className={styles.menu__link} onClick={toggleMenu}>
                  {link.title}
                </a>
              )}

              <div className={styles.menu__line} />
            </React.Fragment>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
