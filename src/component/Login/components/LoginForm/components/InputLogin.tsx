import { HTMLProps, VFC } from 'react';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';

import { Error } from '.';

type MetaType = {
  touched: boolean;
  error: string;
};

type InputLoginProps = {
  input: HTMLProps<HTMLInputElement>;
  meta: MetaType;
};

const useStyles = makeStyles({
  inputWrapper: {
    marginBottom: '15px',
  },

  input: {
    width: '100%',
    padding: '12px',
    borderRadius: '2px',
  },

  inputError: ({ showError }: { showError: boolean }) => ({
    border: showError ? '1px solid #FF3636' : '1px solid #D5D5D6',
  }),
});

export const InputLogin: VFC<InputLoginProps> = ({ input, meta, ...props }) => {
  const { touched, error } = meta;

  const classes = useStyles({
    showError: Boolean(touched && error),
  });

  return (
    <div className={classes.inputWrapper}>
      <input className={clsx(classes.input, classes.inputError)} {...input} {...props} />
      {touched && error && <Error error={error} />}
    </div>
  );
};
