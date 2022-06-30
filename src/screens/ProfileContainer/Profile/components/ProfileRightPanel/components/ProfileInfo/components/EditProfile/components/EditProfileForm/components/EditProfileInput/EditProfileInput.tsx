import { HTMLProps, VFC } from 'react';
import { TextField } from '@mui/material';

type MetaType = {
  touched: boolean;
  error: string;
};

type PropTypes = {
  input: HTMLProps<HTMLInputElement>;
  meta: MetaType;
  styles: string;
  placeholder: string;
  type: string;
};

export const EditProfileInput: VFC<PropTypes> = ({ input, meta, placeholder, type }) => {
  const { touched, error } = meta;
  const shouldErrorDisplay = Boolean(touched && error);

  return (
    <TextField
      id='standard-basic'
      label={placeholder}
      error={shouldErrorDisplay}
      variant='standard'
      inputProps={input}
      placeholder={placeholder}
      type={type}
      sx={{ width: '100%' }}
    />
  );
};
