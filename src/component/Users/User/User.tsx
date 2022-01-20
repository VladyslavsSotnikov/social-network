import React, { VFC } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import man from '../../../assests/man.svg'
import { UserType } from '../../../models'

interface UserProps extends UserType {
    photo?: string | null;
    follow: (userId:number) => void;
    unfollow: (userId:number) => void;
    followingInProgress: number[];
}

const User:VFC<UserProps> = ({ id, name, status, photo, followed, follow, unfollow, followingInProgress }) => {
    return (
        <div className="user">
            <div className="user__avatar">
                <Link to={`/profile/${id}`}><img src={photo ? photo : man} alt="user" /></Link>
                <button
                    onClick={!followed ? () => follow(id) : () => unfollow(id)}
                    className={classNames("user__btn", { "user__btn-disabled": followingInProgress.some(userId => userId === id) })}
                > {!followed ? 'Dodaj' : 'Usuń'}
                </button>
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
