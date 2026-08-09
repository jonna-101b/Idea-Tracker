import TextField from '@mui/material/TextField';
import { inputSx } from './variants';
import type { InputProps } from './types';

const Input = ({ sx, ...props }: InputProps) => (
  <TextField fullWidth variant="outlined" sx={[inputSx, ...(Array.isArray(sx) ? sx : [sx])]} {...props} />
);

export default Input;
export type { InputProps } from './types';
