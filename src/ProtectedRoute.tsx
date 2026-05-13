import { Navigate } from 'react-router-dom';
import { isAuthenticated } from './modules/shared/utils/auth';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const ProtectedRoute = ({ children }: Props) => {
  if (!isAuthenticated()) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};
