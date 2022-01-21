import { ChangeEvent, VFC } from "react";
import { useDispatch } from "react-redux";
import classNames from "classnames";

import profileAvatar from '../../../../assests/profile-photo.png';
import { savePhoto } from '../../../../redux/reducers';

type ProfilePhotoProps = {
    photo?: string | null;
    currentUserId?: number;
    authUserId?: number;
    followInfo: boolean;
    follow: (userId: number) => void;
    unfollow: (userId: number) => void;
    followingInProgres: boolean;
};

export const ProfilePhoto: VFC<ProfilePhotoProps> = ({ photo, currentUserId, authUserId, followInfo, follow, unfollow, followingInProgres }) => {
    const dispatch = useDispatch();

    const sendPhotoToServer = (e:ChangeEvent<HTMLInputElement> ) => {
        if (e.target.files?.length) {
            dispatch(savePhoto(e.target.files[0]))
        }
    };

    return (
        <div className="profile__block">
            <div className="profile__avatar">
                <img className="profile__avatar_img" src={photo ? photo : profileAvatar} alt="avatar" />
            </div>
            <div className="profile__btn_block">
                {currentUserId &&
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
};