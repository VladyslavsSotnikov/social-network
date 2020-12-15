import React from 'react'
import { Link } from 'react-router-dom'
import man from '../../../assests/man.svg'

function User({ id, name, status, photo, followed }) {
    return (
        <div className="user">
            <div className="user__avatar">
                <Link to={`/profile/${id}`}><img src={photo ? photo : man} alt="user" /></Link>
                <button className="user__btn">{!followed ? 'Dodaj' : 'Usuń'}</button>
            </div>
            <div className="user__info">
                <Link to={`profile/${id}`} >
                    <p className="user__name">
                        {name}
                    </p>
                </Link>
                <span className="user__status">
                    {status}
                </span>
            </div>
        </div>
    )
}

export default User
