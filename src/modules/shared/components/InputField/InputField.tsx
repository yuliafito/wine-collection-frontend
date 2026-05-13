import styles from '../../../AuthPage/LoginForm/LoginForm.module.scss';

interface InputFieldProps {
  label: string;
  type?: string;
  name?: string;
  autoComplete?: string;
  placeholder?: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  type = 'text',
  name,
  autoComplete,
  placeholder,
  value,
  error,
  onChange,
}) => {
  const id = name || label.replace(/\s+/g, '-').toLowerCase();

  return (
    <div className={styles.form__field}>
      <label htmlFor={id} className={styles.form__label}>
        {label}
      </label>

      <input
        id={id}
        className={`${styles.form__input} ${error ? styles['form__input-error'] : ''}`}
        type={type}
        name={name}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      {error && <span className={styles.form__error}>{error}</span>}
    </div>
  );
};
