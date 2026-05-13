import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../../shared/api/auth';
import { saveTokens } from '../../shared/utils/auth';
import { mergeCartApi } from '../../shared/api/cart';

import { InputField } from '../../shared/components/InputField/InputField';
import { PasswordField } from '../../shared/components/PasswordField/PasswordField';

import styles from '../LoginForm/LoginForm.module.scss';

interface Props {
  onSwitch: () => void;
}

interface Errors {
  firstName?: string;
  lastName?: string;
  phone?: string;
  birthDate?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export interface ApiError {
  email?: string[];
  password?: string[];
  detail?: string;
}

export const RegisterForm: React.FC<Props> = ({ onSwitch }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const navigate = useNavigate();

  const validate = (): boolean => {
    const newErrors: Errors = {};

    if (!firstName.trim()) {
      newErrors.firstName = 'Введіть імʼя';
    }

    if (!lastName.trim()) {
      newErrors.lastName = 'Введіть прізвище';
    }

    if (!phone.trim()) {
      newErrors.phone = 'Введіть номер телефону';
    } else if (!/^\+?\d[\d\s()-]{7,}$/.test(phone)) {
      newErrors.phone = 'Некоректний номер телефону';
    }

    if (!birthDate) {
      newErrors.birthDate = 'Вкажіть дату народження';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Некоректний email';
    }

    if (!password) {
      newErrors.password = 'Введіть пароль';
    } else if (password.length < 6) {
      newErrors.password = 'Пароль має містити мінімум 6 символів';
    }

    if (confirmPassword !== password) {
      newErrors.confirmPassword = 'Паролі не співпадають';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await register({
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        phone,
        birth_date: birthDate,
      });

      const tokens = await login({ email, password });
      saveTokens(tokens.access, tokens.refresh);

      await mergeCartApi();

      navigate('/account');
    } catch (err: unknown) {
      const apiError = err as ApiError;

      setErrors({
        email: apiError?.email?.[0] || apiError?.detail || 'Помилка реєстрації',
      });
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <h1 className={styles.form__title}>Реєстрація</h1>

      <InputField
        label="Ім'я"
        name="given-name"
        autoComplete="given-name"
        placeholder="Імʼя"
        value={firstName}
        error={errors.firstName}
        onChange={(v) => {
          setFirstName(v);
          setErrors((p) => ({ ...p, firstName: undefined }));
        }}
      />

      <InputField
        label="Прізвище"
        name="family-name"
        autoComplete="family-name"
        placeholder="Прізвище"
        value={lastName}
        error={errors.lastName}
        onChange={(v) => {
          setLastName(v);
          setErrors((p) => ({ ...p, lastName: undefined }));
        }}
      />

      <InputField
        label="Електронна пошта"
        type="email"
        name="email"
        autoComplete="email"
        placeholder="Ел. пошта"
        value={email}
        error={errors.email}
        onChange={(v) => {
          setEmail(v);
          setErrors((p) => ({ ...p, email: undefined }));
        }}
      />

      <InputField
        label="Телефон"
        type="tel"
        name="phone"
        autoComplete="tel"
        placeholder="Телефон"
        value={phone}
        error={errors.phone}
        onChange={(v) => {
          setPhone(v);
          setErrors((p) => ({ ...p, phone: undefined }));
        }}
      />

      <InputField
        label="Дата народження"
        type="date"
        name="birthDate"
        autoComplete="bday"
        placeholder="Дата народження"
        value={birthDate}
        error={errors.birthDate}
        onChange={(v) => {
          setBirthDate(v);
          setErrors((p) => ({ ...p, birthDate: undefined }));
        }}
      />

      <PasswordField
        label="Пароль"
        name="new-password"
        autoComplete="new-password"
        value={password}
        placeholder="Пароль"
        show={showPassword}
        toggleShow={() => setShowPassword((p) => !p)}
        error={errors.password}
        onChange={(v) => {
          setPassword(v);
          setErrors((p) => ({ ...p, password: undefined }));
        }}
      />

      <PasswordField
        label="Повторіть пароль"
        name="new-password-confirm"
        autoComplete="new-password"
        value={confirmPassword}
        placeholder="Повторіть пароль"
        show={showPassword}
        toggleShow={() => setShowPassword((p) => !p)}
        error={errors.confirmPassword}
        onChange={(v) => {
          setConfirmPassword(v);
          setErrors((p) => ({ ...p, confirmPassword: undefined }));
        }}
      />

      <button className={styles.form__button} type="submit">
        Зареєструватись
      </button>

      <p className={styles.form__text}>
        Вже маєте акаунт?{' '}
        <button type="button" className={styles.form__link} onClick={onSwitch}>
          Увійти
        </button>
      </p>
    </form>
  );
};
