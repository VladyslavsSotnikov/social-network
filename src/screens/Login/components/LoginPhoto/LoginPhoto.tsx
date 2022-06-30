import { makeStyles } from '@mui/styles';

import loginIcon from '../../../../assests/loginIcon.svg';

const useStyles = makeStyles({
  loginIcon: {
    width: '90px',
    height: '90px',
  },
});

export const LoginPhoto = () => {
  const classes = useStyles();

  return <img className={classes.loginIcon} src={loginIcon} alt='login icon' />;
};
