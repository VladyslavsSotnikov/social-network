import React from 'react'
import classNames from 'classnames'
import { useDispatch } from 'react-redux'
import profileAvatar from '../../../assests/profile-photo.png'
import { savePhoto } from '../../../redux/reducers/profile-reducer'

function ProfilePhoto({ photo, currentUserId, authUserId, followInfo, follow, unfollow, followingInProgres }) {
    const dispatch = useDispatch()

    const sendPhotoToServer = (e) => {
        if (e.target.files.length) {
            dispatch(savePhoto(e.target.files[0]))
        }
    }

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
                        : <div>
                            <div className="profile__photo-container"><label htmlFor="photo" className="profile__btn profile__btn--photo">Zmień zdięcie</label></div>
                            <div><input type="file" id="photo" onChange={sendPhotoToServer} /></div>
                        </div>
                }

            </div>
        </div>
    )
}

export default ProfilePhoto
