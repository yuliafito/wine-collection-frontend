import { useState } from 'react';
import type { User } from '../../../../types/User';
import { InputField } from '../../../shared/components/InputField/InputField';
import { updateMe } from '../../../shared/api/auth';
import styles from './Details.module.scss';

type Props = {
  user: User;
  onSave: (user: User) => void;
  onCancel: () => void;
  onError: () => void;
};

type Errors = Partial<Record<keyof User, string>>;

export const DetailsEdit = ({ user, onSave, onCancel, onError }: Props) => {
  const [form, setForm] = useState<User>(user);
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: Errors = {};

    if (!form.first_name.trim()) {
      newErrors.first_name = 'Імʼя обовʼязкове';
    }

    if (!form.last_name.trim()) {
      newErrors.last_name = 'Прізвище обовʼязкове';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Некоректний email';
    }

    if (!/^\+?\d[\d\s()-]{7,}$/.test(form.phone)) {
      newErrors.phone = 'Некоректний номер телефону';
    }

    if (!form.birth_date) {
      newErrors.birth_date = 'Вкажіть дату народження';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      setIsSubmitting(true);

      await updateMe({
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email,
        phone: form.phone,
        birth_date: form.birth_date,
      });

      onSave(form);
    } catch {
      onError();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof User) => (value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return (
    <section className={styles.details}>
      <h2 className={styles.details__title}>Редагування даних</h2>

      <InputField
        label="Імʼя"
        value={form.first_name}
        error={errors.first_name}
        onChange={handleChange('first_name')}
      />

      <InputField
        label="Прізвище"
        value={form.last_name}
        error={errors.last_name}
        onChange={handleChange('last_name')}
      />

      <InputField
        label="Email"
        value={form.email}
        error={errors.email}
        onChange={handleChange('email')}
      />

      <InputField
        label="Телефон"
        value={form.phone}
        error={errors.phone}
        onChange={handleChange('phone')}
      />

      <InputField
        label="Дата народження"
        type="date"
        value={form.birth_date ?? ''}
        error={errors.birth_date}
        onChange={handleChange('birth_date')}
      />

      <div className={styles.details__actions}>
        <button className={styles.details__button} onClick={handleSubmit} disabled={isSubmitting}>
          Зберегти
        </button>

        <button
          type="button"
          className={styles.details__button}
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Скасувати
        </button>
      </div>
    </section>
  );
};
