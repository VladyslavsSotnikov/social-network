import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  header: {
    fontFamily: 'Oswald',
    fontSize: '24px',
    margin: '15px 0',
  },
});

export const LoginHeader = () => {
  const classes = useStyles();
  return <h3 className={classes.header}>Zaloguj się</h3>;
};
