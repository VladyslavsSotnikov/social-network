import { makeStyles } from '@mui/styles';
import { HTMLProps, VFC } from 'react';

type CheckBoxLoginProps = {
  input: HTMLProps<HTMLInputElement>;
};

const useStyles = makeStyles({
  checkboxWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },

  checkbox: {
    marginRight: '15px',

    '&:hover': {
      cursor: 'pointer',
    },

    '&:checked': {
      backgroundColor: '#4A76A8',
    },
  },

  label: {
    fontSize: '14px',
    fontWeight: 400,
  },
});

export const CheckBoxLogin: VFC<CheckBoxLoginProps> = ({ input, ...props }) => {
  const classes = useStyles();

  return (
    <div className={classes.checkboxWrapper}>
      <input id='checkbox' className={classes.checkbox} {...input} {...props} />
      <label className={classes.label} htmlFor='checkbox'>
        Zapamiętaj mnie
      </label>
    </div>
  );
};
