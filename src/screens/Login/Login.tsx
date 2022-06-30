import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';

import { LoginDescription, LoginForm, LoginHeader, LoginPhoto } from '../Login/components';

import { AppStoreType } from '../../redux/store';
import { login } from '../../redux/reducers/auth-reducer';

import { LoginFormValuesType } from '../../models';
import { minLength } from '../../helpers/validators';

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
        <LoginPhoto />
        <LoginHeader />
        <LoginDescription />
        <LoginForm onSubmit={onClickSubmit} minLength={minLength4} captchaUrl={captchaUrl} />
      </div>
    </div>
  );
};
