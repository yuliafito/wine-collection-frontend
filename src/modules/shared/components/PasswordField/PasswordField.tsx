import { Visibility, VisibilityOff } from '@mui/icons-material';
import styles from '../../../AuthPage/LoginForm/LoginForm.module.scss';

interface PasswordFieldProps {
  label: string;
  name?: string;
  autoComplete?: string;
  value: string;
  placeholder?: string;
  error?: string;
  show: boolean;
  toggleShow: () => void;
  onChange: (value: string) => void;
}

export const PasswordField: React.FC<PasswordFieldProps> = ({
  label,
  name,
  autoComplete,
  value,
  placeholder,
  error,
  show,
  toggleShow,
  onChange,
}) => {
  const id = name || label.replace(/\s+/g, '-').toLowerCase();

  return (
    <div className={styles.form__field}>
      <label htmlFor={id} className={styles.form__label}>
        {label}
      </label>

      <div className={styles.form__password}>
        <input
          id={id}
          className={`${styles.form__input} ${error ? styles['form__input-error'] : ''}`}
          type={show ? 'text' : 'password'}
          name={name}
          autoComplete={autoComplete}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />

        <button
          type="button"
          className={styles.form__eye}
          onClick={toggleShow}
          aria-label={show ? 'Сховати пароль' : 'Показати пароль'}
        >
          {show ? <VisibilityOff /> : <Visibility />}
        </button>
      </div>

      {error && <span className={styles.form__error}>{error}</span>}
    </div>
  );
};
