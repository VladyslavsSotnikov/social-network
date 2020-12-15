import React from 'react'

import logo from '../../assests/logo.svg'
import man from '../../assests/man.svg'
import logout from '../../assests/logout.svg'
function Header() {
    return (
        <div className="header">
            <div className="header__wraper">
                <div className="header__logo">
                    <img src={logo} className="header__logoImg" alt="logo" />
                </div>
                <div className="header__auth">
                    <div className="header__login">
                        energol777
                </div>
                    <div className="header__img">
                        <img className="header__manImg" src={man} alt="man" />
                    </div>
                    <div className="header__logout">
                        <img className="header__logoutImg" src={logout} alt="logout" />
                    </div>
                </div>
            </div>

        </div>

    )
}

export default Header
