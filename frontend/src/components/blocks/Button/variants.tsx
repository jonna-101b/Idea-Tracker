import type { ButtonProps } from './types';

export const buttonVariants: Record<NonNullable<ButtonProps['variant']>, object> = {
  primary: {
    backgroundColor: '#4545d9',
    color: '#ffffff',
    '&:hover': { backgroundColor: '#3838c8' },
    '&.Mui-disabled': { backgroundColor: '#c9c9ee', color: '#ffffff' },
  },
  secondary: {
    backgroundColor: '#ffffff',
    border: '1px solid #c9c7df',
    color: '#16151d',
    '&:hover': { backgroundColor: '#f8f8fc', borderColor: '#aaa8cb' },
  },
};
