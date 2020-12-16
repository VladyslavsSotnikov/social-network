import React from 'react'
import { NavLink } from 'react-router-dom'


function Sidebar() {
    return (
        <div className="sidebar">
            <ul className="sidebar__list">

                <NavLink to='/profile' className='sidebar__item' activeClassName='sidebar__item--active'>
                    <svg className="sidebar__svg" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M29.1907 13.0486L29.1886 13.0465L16.951 0.809326C16.4294 0.287476 15.7359 0 14.9982 0C14.2605 0 13.567 0.287247 13.0451 0.809097L0.813904 13.0401C0.809784 13.0442 0.805664 13.0486 0.801544 13.0527C-0.269622 14.13 -0.267791 15.878 0.806809 16.9526C1.29776 17.4438 1.94618 17.7283 2.63947 17.758C2.66762 17.7608 2.696 17.7621 2.72461 17.7621H3.21236V26.768C3.21236 28.55 4.66232 30 6.44485 30H11.2326C11.7178 30 12.1115 29.6066 12.1115 29.1211V22.0605C12.1115 21.2473 12.773 20.5859 13.5862 20.5859H16.4101C17.2234 20.5859 17.8848 21.2473 17.8848 22.0605V29.1211C17.8848 29.6066 18.2783 30 18.7637 30H23.5515C25.334 30 26.784 28.55 26.784 26.768V17.7621H27.2362C27.9737 17.7621 28.6672 17.4749 29.1893 16.953C30.265 15.8766 30.2655 14.1257 29.1907 13.0486Z" fill="#5D748A" />
                    </svg>
                    <span className="sidebar__lable">Profil</span>
                </NavLink>

                <NavLink to='/chats/' className='sidebar__item' activeClassName='sidebar__item--active'>
                    <svg className="sidebar__svg" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0)">
                            <path d="M4.36791 28.2068H2.24224L3.7453 26.7037C4.55574 25.8933 5.06183 24.8392 5.19789 23.6957C1.72729 21.4181 0 18.1186 0 14.6596C0 8.27809 5.86522 1.79297 15.0508 1.79297C24.782 1.79297 30 7.7605 30 14.1005C30 20.4823 24.7269 26.4459 15.0508 26.4459C13.3558 26.4459 11.5871 26.2196 10.008 25.8044C8.51312 27.3377 6.4877 28.2068 4.36791 28.2068Z" fill="#5D748A" />
                        </g>
                        <defs>
                            <clipPath id="clip0">
                                <rect width="30" height="30" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>

                    <span className="sidebar__lable">Czaty</span>
                </NavLink>

                <NavLink to='/users' className='sidebar__item' activeClassName='sidebar__item--active'>
                    <svg className="sidebar__svg sidebar__svg--active" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.0001 14.672C18.3356 14.672 21.0398 11.3876 21.0398 7.33603C21.0398 3.2844 20.1519 0 15.0001 0C9.84821 0 8.96021 3.2844 8.96021 7.33603C8.96021 11.3876 11.6644 14.672 15.0001 14.672Z" fill="#5D748A" />
                        <path d="M3.59225 25.873C3.59122 25.626 3.59019 25.8034 3.59225 25.873V25.873Z" fill="#5D748A" />
                        <path d="M26.4073 26.0657C26.4106 25.9981 26.4085 25.5965 26.4073 26.0657V26.0657Z" fill="#5D748A" />
                        <path d="M26.3945 25.5769C26.2826 18.519 25.3608 16.5079 18.3072 15.2349C18.3072 15.2349 17.3142 16.5001 15 16.5001C12.6857 16.5001 11.6926 15.2349 11.6926 15.2349C4.71588 16.494 3.73805 18.4753 3.60948 25.3476C3.59893 25.9088 3.59405 25.9383 3.59216 25.8731C3.59259 25.9952 3.59311 26.221 3.59311 26.6146C3.59311 26.6146 5.27242 30 15 30C24.7273 30 26.4068 26.6146 26.4068 26.6146C26.4068 26.3617 26.407 26.1858 26.4073 26.0662C26.4054 26.1064 26.4016 26.0284 26.3945 25.5769Z" fill="#5D748A" />
                    </svg>

                    <span className="sidebar__lable">Kontakty</span>
                </NavLink>
            </ul>
        </div >
    )
}

export default Sidebar
