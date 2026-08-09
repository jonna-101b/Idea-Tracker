import MuiButton from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { buttonVariants } from './variants';
import type { ButtonProps } from './types';

const StyledButton = styled(MuiButton, {
  shouldForwardProp: (prop) => prop !== 'appVariant',
})<{ appVariant: NonNullable<ButtonProps['variant']> }>(({ appVariant }) => ({
  borderRadius: 8,
  boxShadow: 'none',
  minHeight: 50,
  padding: '10px 18px',
  fontSize: 16,
  fontWeight: 500,
  lineHeight: 1.25,
  textTransform: 'none',
  outline: 'none',
  ...buttonVariants[appVariant],
  '&:focus-visible': {
    outline: '3px solid rgba(69, 69, 217, 0.28)',
    outlineOffset: 2,
  },
}));

const Button = ({ variant = 'primary', ...props }: ButtonProps) => (
  <StyledButton appVariant={variant} {...props} />
);

export default Button;
export type { ButtonProps } from './types';
