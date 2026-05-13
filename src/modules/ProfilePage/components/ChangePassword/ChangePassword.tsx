import { useState } from 'react';
import { changePassword } from '../../../shared/api/auth';
import { useSnackbar } from '../../../shared/hooks/useSnackbar';
import { AppSnackbar } from '../../../shared/components/AppSnackbar/AppSnackbar';
import { PasswordField } from '../../../shared/components/PasswordField/PasswordField';
import styles from './ChangePassword.module.scss';

type FormState = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

export const ChangePassword = () => {
  const [values, setValues] = useState<FormState>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { snackbar, showSuccess, showError, close } = useSnackbar();

  const handleChange = (field: keyof FormState) => (value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: Errors = {};

    if (!values.currentPassword) {
      newErrors.currentPassword = 'Введіть поточний пароль';
    }

    if (values.newPassword.length < 6) {
      newErrors.newPassword = 'Пароль має містити мінімум 6 символів';
    }

    if (values.newPassword !== values.confirmPassword) {
      newErrors.confirmPassword = 'Паролі не співпадають';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setIsSubmitting(true);

      await changePassword({
        old_password: values.currentPassword,
        new_password: values.newPassword,
      });

      showSuccess('Пароль успішно змінено');

      setValues({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch {
      showError('Помилка зміни пароля');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form className={styles['change-password-form']} onSubmit={handleSubmit}>
        <h2 className={styles['change-password-form__title']}>Зміна пароля</h2>

        <div className={styles['change-password-form__fields']}>
          <PasswordField
            label="Поточний пароль"
            value={values.currentPassword}
            error={errors.currentPassword}
            show={showCurrent}
            toggleShow={() => setShowCurrent((p) => !p)}
            onChange={handleChange('currentPassword')}
          />

          <PasswordField
            label="Новий пароль"
            value={values.newPassword}
            error={errors.newPassword}
            show={showNew}
            toggleShow={() => setShowNew((p) => !p)}
            onChange={handleChange('newPassword')}
          />

          <PasswordField
            label="Підтвердити новий пароль"
            value={values.confirmPassword}
            error={errors.confirmPassword}
            show={showConfirm}
            toggleShow={() => setShowConfirm((p) => !p)}
            onChange={handleChange('confirmPassword')}
          />
        </div>

        <button
          type="submit"
          className={styles['change-password-form__button']}
          disabled={isSubmitting}
        >
          Змінити пароль
        </button>
      </form>

      <AppSnackbar {...snackbar} onClose={close} />
    </>
  );
};
