import React, { useEffect, useState, VFC } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { ContactsType, ProfileDataType } from '../../../../models';
import { updateStatus } from '../../../../redux/reducers';
import { AppStoreType } from '../../../../redux/store';
import { EditProfile } from './components';

type ProfileInfoProps = {
    profile: ProfileDataType | null;
    currentUserId?: number;
    authUserId?: number;
}

export const ProfileInfo: VFC<ProfileInfoProps> = ({ profile, currentUserId, authUserId }) => {
    const dispatch = useDispatch()
    const { status } = useSelector(({ profile }: AppStoreType) => profile)
    const [editMode, setEditMode] = useState(false)
    const [localStatus, setLocalStatus] = useState(status)
    const [profileEditMode, setProfileEditMode] = useState(false)

    const onChangeStatus = () => {
        setEditMode(false)
        if (status !== localStatus && profile?.userId) {
            dispatch(updateStatus(localStatus, profile.userId))
        }

    }

    useEffect(() => {
        setLocalStatus(status)
    }, [status])

    return (
        <div className="profile__info" >
            {profile && <div className="profile__top" >
                <h4 className="profile__name">{profile.fullName}</h4>
                {
                    currentUserId === authUserId
                        ? !editMode
                            ? <span className="profile__status" onClick={() => setEditMode(true)} >
                                {status ? status : null}</span>
                            : <form className="profile__form">
                                <input autoFocus={true}
                                    onBlur={() => onChangeStatus()}
                                    className="profile__form-input"
                                    type="text" placeholder={status}
                                    value={localStatus}
                                    onChange={e => setLocalStatus(e.target.value)}
                                />
                            </form>
                        : <span className="profile__status profile__status--other">{status ? status : null}</span>
                }
            </div>}

            {profile && <div className="profile__about">

                <div className="profile__btn-container">
                    {currentUserId === authUserId && <button onClick={() => setProfileEditMode(true)} className="profile__btn profile__btn--edit">Edytuj</button>}
                </div>

                <ul className="profile__about-list">


                    <li className="profile__about-item">
                        <p className="profile__about-contact">O mnie:</p>
                        {/* <span className="profile__about-span">{profile.aboutMe ? profile.aboutMe : '-'}</span> */}
                    </li>

                    <li className="profile__about-item">
                        <p className="profile__about-contact">Szukam pracy:</p>
                        <span className="profile__about-span">{profile.lookingForAJob ? 'Tak' : 'Nie'}</span>
                    </li>

                    <li className="profile__about-item">
                        <p className="profile__about-contact">Moje umiejętności:</p>
                        <span className="profile__about-span">{profile.lookingForAJobDescription ? profile.lookingForAJobDescription : '-'}</span>
                    </li>
                    {Object.keys(profile.contacts).map((contact) => {
                        return (
                            <li key={contact} className="profile__about-item">
                                <p className="profile__about-contact">{contact}: </p>
                                <span className="profile__about-span">{profile.contacts[contact as keyof ContactsType] ? profile.contacts[contact as keyof ContactsType] : '-'}</span>
                            </li>
                        )
                    })}
                </ul>
            </div>}
            { profileEditMode && <EditProfile setEditMode={setProfileEditMode} profile={profile} />}
        </div>
    )
};