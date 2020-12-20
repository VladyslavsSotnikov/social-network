import React from 'react'

import profileAvatar from '../../../assests/profile-photo.png'

function ProfilePhoto({ photo, currentUserId, authUserId }) {
    return (
        <div className="profile__block">
            <div className="profile__avatar">
                <img className="profile__avatar_img" src={photo ? photo : profileAvatar} alt="avatar" />
            </div>
            <div className="profile__btn_block">
                {
                    currentUserId !== authUserId
                        ? <button className="profile__btn">Dodaj</button>
                        : <button className="profile__btn">Zmień zdięcie</button>
                }

            </div>
        </div>
    )
}

export default ProfilePhoto
