import { HTMLProps, VFC } from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';

type PropTypes = {
  input: HTMLProps<HTMLInputElement>;
  type: string;
};

export const EditProfileCheckBox: VFC<PropTypes> = ({ input }) => {
  return (
    <FormControlLabel
      value='start'
      control={<Checkbox inputProps={{ ...input }} checked={input.checked} />}
      label='Szukam pracy'
      labelPlacement='start'
      sx={{ display: 'flex', justifyContent: 'start', margin: 0 }}
    />
  );
};
