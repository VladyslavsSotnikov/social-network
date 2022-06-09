import { makeStyles } from '@mui/styles';
import { VFC } from 'react';
import errorIcon from '../../../../../../assests/error.svg';

const useStyles = makeStyles({
  errorWraper: {
    margin: '15px 0',
    display: 'flex',
    alignItems: 'center',
  },

  errorMessage: {
    color: '#FF3636',
    fontSize: '12px',
    marginLeft: '7px',
  },
});

type ErrorProps = {
  error: string;
};

export const Error: VFC<ErrorProps> = ({ error }) => {
  const classes = useStyles();

  return (
    <div className={classes.errorWraper}>
      <img src={errorIcon} alt='error' />
      <p className={classes.errorMessage}>{error}</p>
    </div>
  );
};
