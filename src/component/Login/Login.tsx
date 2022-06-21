import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';

import { LoginForm } from '../Login/components';
import { minLength } from '../common/validators/validators';
import { login } from '../../redux/reducers/auth-reducer';

import loginIcon from '../../assests/loginIcon.svg';
import { AppStoreType } from '../../redux/store';
import { LoginFormValuesType } from '../../models';

const useStyles = makeStyles({
  root: {
    width: '440px',
    height: ' 520px',
    backgroundColor: '#fff',
    borderRadius: '3px',
    boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.25)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  content: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    width: '50%',
  },

  loginIcon: {
    width: '90px',
    height: '90px',
  },

  header: {
    fontFamily: 'Oswald',
    fontSize: '24px',
    margin: '15px 0',
  },

  form: {
    width: '100%',
  },
});

export const Login = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { captchaUrl } = useSelector(({ auth }: AppStoreType) => auth);
  const minLength4 = minLength(4);

  const onClickSubmit = (data: LoginFormValuesType) => {
    dispatch(login(data.email, data.password, data.rememberMe, data.captcha));
  };

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <img className={classes.loginIcon} src={loginIcon} alt='login icon' />
        <h3 className={classes.header}>Zaloguj się</h3>
        <div className={classes.form}>
          <LoginForm onSubmit={onClickSubmit} minLength={minLength4} captchaUrl={captchaUrl} />
        </div>
      </div>
    </div>
  );
};
