import { SnackbarProps } from '@mui/material/Snackbar';

export interface SnackbarProviderValues {
  enqueueSnackbar(props: SnackbarProps): void;
}
