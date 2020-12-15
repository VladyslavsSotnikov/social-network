import React from 'react'
import icon from '../../assests/loginIcon.svg'
import error from '../../assests/error.svg'
function Login() {
    return (
        <div className="login">
            <div className="login__content">
                <div className="login__img">
                    <img className="login__icon" src={icon} alt="Login icon" />
                </div>
                <h3 className="login__title">Zaloguj się</h3>
                <div className="login__form">
                    <form className="login__form">
                        <div className="login__input">
                            <input className="login__inputText login__inputText--error" type="text" placeholder="e-mail" />
                            <div className="login__error">
                                <img className="logo__errorIcon" src={error} alt="error" />
                                <p className="login__errorText">
                                    Wprowadź poprawny e-mail
                                </p>
                            </div>
                        </div>
                        <div className="login__input">
                            <input className="login__inputText" type="text" placeholder="hasło" />
                        </div>
                        <div className="login__checkbox">
                            <input type="checkbox" id="checkbox" className="login__inputCheckbox" />
                            <label className="login__checkboxLabel" htmlFor="checkbox">Zapamiętaj mnie</label>
                        </div>

                        {/* <div className="login__error">
                            <img className="logo__errorIcon" src={error} alt="error" />
                            <p className="login__errorText">
                                Wprowadź poprawny e-mail
                            </p>
                        </div> */}
                        <button className="login__btn" type="submit">Zaloguj się</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
