import { useFeaturedProducts } from '../shared/hooks/useFeaturedProducts';
import { Loader } from '../shared/components/Loader';
import { AboutUs } from './components/AboutUs';
import { HomeHero } from './components/HomeHero';
import { ProductSlider } from './components/ProductSlider';

import styles from './HomePage.module.scss';
import { usePurposeByName } from '../shared/hooks/usePurposeByName';

export const HomePage = () => {
  const giftPurposeId = usePurposeByName('На Подарунок');

  const { products, loading } = useFeaturedProducts({
    purpose: giftPurposeId,
    limit: 6,
  });

  return (
    <div className={styles.home}>
      <div className={styles.home__main}>
        <HomeHero />

        {loading && <Loader />}

        {!loading && products.length > 0 && (
          <div className={styles['home__slider-wrapper']}>
            <ProductSlider products={products} header="Вина на подарунок" />
          </div>
        )}

        <AboutUs />
      </div>
    </div>
  );
};
