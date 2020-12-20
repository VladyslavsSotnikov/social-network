import React from 'react'

import logo from '../../assests/logo.svg'
import man from '../../assests/man.svg'
import logoutIMG from '../../assests/logout.svg'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../../redux/reducers/auth-reducer'
function Header() {

    const dispatch = useDispatch()


    const { isAuth, userData } = useSelector(({ auth }) => auth)

    const onClickLogout = () => dispatch(logout())

    return (
        <div className="header">
            <div className="header__wraper">
                <div className="header__logo">
                    <img src={logo} className="header__logoImg" alt="logo" />
                </div>
                {
                    isAuth
                        ? <div className="header__auth">
                            <div className="header__login">
                                {userData.login}
                            </div>
                            <div className="header__img">
                                <img className="header__manImg" src={man} alt="man" />
                            </div>
                            <div className="header__logout" onClick={onClickLogout}>
                                <img className="header__logoutImg" src={logoutIMG} alt="logout" />
                            </div>
                        </div>
                        : <Link to='/login' className="header__login-btn">Login</Link>
                }

            </div>

        </div>

    )
}

export default Header
