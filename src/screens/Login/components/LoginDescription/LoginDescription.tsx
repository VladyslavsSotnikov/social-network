import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  description: {
    marginBottom: '10px',
  },
});

export const LoginDescription = () => {
  const classes = useStyles();

  return (
    <span className={classes.description}>
      <strong>Email</strong>: free@samuraijs.com <strong>Password:</strong> free
    </span>
  );
};
