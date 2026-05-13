import { useState } from 'react';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { AuthLayout } from './AuthLayout';

export const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<'login' | 'register'>('login');

  return (
    <AuthLayout>
      {mode === 'login' ? (
        <LoginForm onSwitch={() => setMode('register')} />
      ) : (
        <RegisterForm onSwitch={() => setMode('login')} />
      )}
    </AuthLayout>
  );
};
