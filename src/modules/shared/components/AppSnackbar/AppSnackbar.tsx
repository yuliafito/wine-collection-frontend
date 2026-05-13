import { Alert, Snackbar } from '@mui/material';

type Props = {
  open: boolean;
  message: string;
  severity: 'success' | 'error';
  onClose: () => void;
};

export const AppSnackbar = ({ open, message, severity, onClose }: Props) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert onClose={onClose} severity={severity} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
};
