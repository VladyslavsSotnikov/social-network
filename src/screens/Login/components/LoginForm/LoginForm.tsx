import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { makeStyles } from '@mui/styles';

import { required, email } from '../../../../helpers/validators';
import { CheckBoxLogin, InputLogin, Error } from './components';
import { VFC } from 'react';
import { LoginFormValuesType } from '../../../../models';

type PropsType = {
  captchaUrl: string | null;
  minLength: (value: string) => string | undefined;
};

const useStyles = makeStyles({
  submitButton: {
    width: '100%',
    padding: '14px 0',
    backgroundColor: '#4A76A8',
    color: '#fff',
    border: 'none',
    borderRadius: '2px',
    transition: 'filter 0.2s ease-in-out',
    letterSpacing: '2px',

    '&:hover': {
      cursor: 'pointer',
      filter: 'brightness(120%)',
    },
  },

  form: {
    width: '100%',
  },
});

const Form: VFC<InjectedFormProps<LoginFormValuesType, PropsType> & PropsType> = ({
  handleSubmit,
  minLength,
  captchaUrl,
  error,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.form}>
      <form onSubmit={handleSubmit}>
        <Field component={InputLogin} type='email' name='email' placeholder='e-mail' validate={[required, email]} />
        <Field
          component={InputLogin}
          type='password'
          name='password'
          placeholder='hasło'
          validate={[required, minLength]}
        />

        {captchaUrl && <img src={captchaUrl} alt='captcha' />}
        {captchaUrl && <Field component={InputLogin} name='captcha' validate={[required]} />}

        <Field component={CheckBoxLogin} type='checkbox' name='rememberMe' />

        {error && <Error error={error} />}

        <button className={classes.submitButton} type='submit'>
          Zaloguj się
        </button>
      </form>
    </div>
  );
};

export const LoginForm = reduxForm<LoginFormValuesType, PropsType>({ form: 'login' })(Form);
