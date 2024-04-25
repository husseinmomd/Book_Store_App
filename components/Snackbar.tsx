import { useState, useEffect } from 'react';
import { Snackbar, SnackbarProps } from 'react-native-paper';

type CustomSnackbarProps = {
  visible: boolean;
  onDismiss?: () => void;
  duration?: number;
  message: string;
} & Omit<SnackbarProps, 'children'>;

export function CustomSnackbar({
  visible,
  onDismiss,
  duration = 3000,
  message,
}: CustomSnackbarProps) {
  const [snackbarVisible, setSnackbarVisible] = useState(visible);

  useEffect(() => {
    setSnackbarVisible(visible);
    const timeout = setTimeout(() => {
      setSnackbarVisible(false);
      onDismiss();
    }, duration);

    return () => clearTimeout(timeout);
  }, [visible, duration, onDismiss]);
  return (
    <Snackbar
      style={{ justifyContent: 'center', alignItems: 'center' }}
      visible={snackbarVisible}
      onDismiss={() => {
        setSnackbarVisible(false);
        onDismiss();
      }}
      action={{
        label: 'Dismiss',
        onPress: () => {
          setSnackbarVisible(false);
          onDismiss();
        },
      }}>
      {message}
    </Snackbar>
  );
}
