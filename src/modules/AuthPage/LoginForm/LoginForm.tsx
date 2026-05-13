import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { login } from '../../shared/api/auth';
import { mergeCartApi } from '../../shared/api/cart';
import { saveTokens } from '../../shared/utils/auth';
import { InputField } from '../../shared/components/InputField/InputField';
import { PasswordField } from '../../shared/components/PasswordField/PasswordField';

import styles from '../LoginForm/LoginForm.module.scss';

interface Props {
  onSwitch: () => void;
}

interface Errors {
  email?: string;
  password?: string;
}

export const LoginForm: React.FC<Props> = ({ onSwitch }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const navigate = useNavigate();

  const validate = (): boolean => {
    const newErrors: Errors = {};

    if (!email) {
      newErrors.email = 'Введіть електронну пошту';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Некоректний email';
    }

    if (!password) {
      newErrors.password = 'Введіть пароль';
    } else if (password.length < 6) {
      newErrors.password = 'Пароль має містити мінімум 6 символів';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const tokens = await login({ email, password });
      saveTokens(tokens.access, tokens.refresh);

      await mergeCartApi();

      navigate('/account');
    } catch {
      setErrors({ password: 'Невірний email або пароль' });
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <h1 className={styles.form__title}>Увійти</h1>

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

      <PasswordField
        label="Пароль"
        name="password"
        autoComplete="current-password"
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

      <button className={styles.form__button} type="submit">
        Увійти
      </button>

      <p className={styles.form__text}>
        Ще не зареєстровані?{' '}
        <button type="button" className={styles.form__link} onClick={onSwitch}>
          Зареєструватись
        </button>
      </p>
    </form>
  );
};
