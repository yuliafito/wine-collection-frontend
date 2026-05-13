import { useState, useCallback } from 'react';

export const useSnackbar = () => {
  const [state, setState] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({ open: false, message: '', severity: 'success' });

  const showSuccess = useCallback((message: string) => {
    setState({ open: true, message, severity: 'success' });
  }, []);

  const showError = useCallback((message: string) => {
    setState({ open: true, message, severity: 'error' });
  }, []);

  const close = useCallback(() => {
    setState((p) => ({ ...p, open: false }));
  }, []);

  return {
    snackbar: state,
    showSuccess,
    showError,
    close,
  };
};
