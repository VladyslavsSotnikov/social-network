import React from 'react'
import icon from '../../assests/loginIcon.svg'

import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import LoginForm from './LoginForm/LoginForm'
import { login } from '../../redux/reducers/auth-reducer'
function Login() {

    const dispatch = useDispatch()

    const { isAuth } = useSelector(({ auth }) => auth)

    const onClickSubmit = (data) => {
        dispatch(login(data.email, data.password, data.checkbox))
    }
    return (
        <div>
            {
                !isAuth
                    ? <div className="login">
                        <div className="login__content">
                            <div className="login__img">
                                <img className="login__icon" src={icon} alt="Login icon" />
                            </div>
                            <h3 className="login__title">Zaloguj się</h3>
                            <div className="login__form">
                                <LoginForm onSubmit={onClickSubmit} />
                            </div>
                        </div>
                    </div>
                    : <Redirect to='/profile' />
            }

        </div>

    )
}



export default Login
