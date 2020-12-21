import React from 'react'
import classNames from 'classnames'

import profileAvatar from '../../../assests/profile-photo.png'

function ProfilePhoto({ photo, currentUserId, authUserId, followInfo, follow, unfollow, followingInProgres }) {
    return (
        <div className="profile__block">
            <div className="profile__avatar">
                <img className="profile__avatar_img" src={photo ? photo : profileAvatar} alt="avatar" />
            </div>
            <div className="profile__btn_block">
                {
                    currentUserId !== authUserId
                        ? !followInfo
                            ? <button className={classNames("profile__btn", { "user__btn-disabled": followingInProgres })} onClick={() => follow(currentUserId)}>Dodaj</button>
                            : <button className={classNames("profile__btn", { "user__btn-disabled": followingInProgres })} onClick={() => unfollow(currentUserId)}>Usuń</button>
                        : <button className="profile__btn">Zmień zdięcie</button>
                }

            </div>
        </div>
    )
}

export default ProfilePhoto
