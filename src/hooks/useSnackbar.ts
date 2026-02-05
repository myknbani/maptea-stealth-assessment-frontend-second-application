import { useState } from 'react';

type SnackbarState = {
  open: boolean;
  message: string;
  severity: 'success' | 'error';
  leadName?: string;
};

export function useSnackbar() {
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: '',
    severity: 'success',
  });

  const showSuccess = (message: string, leadName?: string) => {
    setSnackbar({ open: true, message, severity: 'success', leadName });
  };

  const showError = (message: string) => {
    setSnackbar({ open: true, message, severity: 'error' });
  };

  const close = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return { snackbar, showSuccess, showError, close };
}
