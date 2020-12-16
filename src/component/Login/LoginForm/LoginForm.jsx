import React from 'react'
import { Field, reduxForm } from 'redux-form'


import { CheckBoxLogin, InputLogin } from '../../common/FormControl/FormControl'
import { emailValidator, minLengthCreator, required } from '../../common/validators/validators'

function LoginForm(props) {

    const minLength8 = minLengthCreator(8)

    return (
        <form className="login__form" onSubmit={props.handleSubmit}>

            <Field
                component={InputLogin}
                type="text"
                name="email"
                placeholder="e-mail"
            // validate={[required, emailValidator]}
            />

            <Field
                component={InputLogin}
                type="password"
                name="password"
                placeholder="hasło"
            // validate={[required, minLength8]}
            />

            <Field
                component={CheckBoxLogin}
                type="checkbox"
                name="checkbox"
            />

            {/* {login__inputText--error} */}
            {/* <div className="login__error">
                                    <img className="logo__errorIcon" src={error} alt="error" />
                                    <p className="login__errorText">
                                        Wprowadź poprawny e-mail
                                    </p>
                                        </div> */}
            <button className="login__btn" type="submit">Zaloguj się</button>
        </form>
    )
}

export default reduxForm({ form: "login-form" })(LoginForm) 
