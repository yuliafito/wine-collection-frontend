import styles from './AboutUs.module.scss';

export const AboutUs = () => {
  return (
    <section id="about" className={styles.about}>
      <div className={styles.about__overlay}>
        <div className={styles.about__wrapper}>
          <h2 className={styles.about__title}>Про нас</h2>

          <div className={styles.about__content}>
            <h3 className={styles.about__subtitle}>
              Wine collection — ваш віртуальний сомельє у світі українського вина
            </h3>

            <p className={styles.about__text}>
              Ми створили український гіпермаркет вин, у якому ви можете легко досліджувати каталог,
              знаходити та підбирати вина за індивідуальними параметрами: призначення, ціна, настрій
              або подія.
            </p>

            <p className={styles.about__text}>
              Наш сервіс допомагає обрати ідеальне вино — для подарунка, святкової події чи
              затишного вечора. Додавайте улюблені позиції до кошика та відкривайте для себе
              українське виноробство разом із Wine collection.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
