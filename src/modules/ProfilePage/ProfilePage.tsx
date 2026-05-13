import styles from './ProfilePage.module.scss';
import { useState } from 'react';

import { Back } from '../shared/components/Back';
import { Sidebar } from './components/Sidebar';
import { Orders } from './components/Orders';
import { Details } from './components/Details';
import { ChangePassword } from './components/ChangePassword';

export type ProfileTab = 'details' | 'orders' | 'password';

export const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState<ProfileTab>('details');

  return (
    <section className={styles.account}>
      <div className={styles.account__wrapper}>
        <Back />

        <h1 className={styles.account__title}>Особистий кабінет</h1>

        <div className={styles.account__layout}>
          <Sidebar active={activeTab} onChange={setActiveTab} />

          <div className={styles.account__content}>
            {activeTab === 'details' && <Details />}
            {activeTab === 'orders' && <Orders />}
            {activeTab === 'password' && <ChangePassword />}
          </div>
        </div>
      </div>
    </section>
  );
};
