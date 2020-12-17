import React from 'react'
import { Field, reduxForm } from 'redux-form'



import { CheckBoxLogin, InputLogin } from '../../common/FormControl/FormControl'
import { required, email } from '../../common/validators/validators'


import errorSVG from '../../../assests/error.svg'
function LoginForm(props) {

    return (
        <form className="login__form" onSubmit={props.handleSubmit}>

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
                validate={[required, props.minLength]}
            />

            <Field
                component={CheckBoxLogin}
                type="checkbox"
                name="checkbox"
            />

            {props.error && <div className="login__error">
                <img className="logo__errorIcon" src={errorSVG} alt="error" />
                <p className="login__errorText">
                    {props.error}
                </p>
            </div>}
            <button className="login__btn" type="submit">Zaloguj się</button>
        </form>
    )
}

export default reduxForm({ form: "login" })(LoginForm) 
