import type { ButtonProps as MuiButtonProps } from '@mui/material/Button';

export type ButtonVariant = 'primary' | 'secondary';

export interface ButtonProps extends Omit<MuiButtonProps, 'variant'> {
  /** Visual treatment used consistently throughout the application. */
  variant?: ButtonVariant;
}
