import { Field, reduxForm } from "redux-form"
import { makeStyles } from "@mui/styles"

import { required, email } from '../../../common/validators/validators'
import { CheckBoxLogin, InputLogin, Error} from './components'  

const useStyles = makeStyles ({
    submitButton: {
        width: '100%',
        padding: '14px 0',
        backgroundColor:'#4A76A8',
        color: '#fff',
        border: 'none',
        borderRadius: '2px',
        transition: 'filter 0.2s ease-in-out',
        letterSpacing: '2px',
        
        '&:hover': {
            cursor: 'pointer',
            filter: 'brightness(120%)',
        }
    }
});

const Form = ({handleSubmit, minLength, error}) => {
    const classes = useStyles();

    return (
        <form onSubmit={handleSubmit}>

            <Field
                component={InputLogin}
                type="email"
                name="email"
                placeholder="e-mail"
                validate={[required, email]}
            />

            <Field
                component={InputLogin}
                type="password"
                name="password"
                placeholder="hasło"
                validate={[required, minLength]}
            />

            <Field
                component={CheckBoxLogin}
                type="checkbox"
                name="checkbox"
            />

            { error && <Error error={error} /> }

            <button className={classes.submitButton} type="submit">Zaloguj się</button>
        </form>
    )
}

export const LoginForm = reduxForm({ form: "login" })(Form) 