import React, { useState } from 'react'
function ProfileInfo({ profile }) {

    const [editMode, setEditMode] = useState(false)


    return (
        <div className="profile__info" >
            {profile && <div className="profile__top" >
                <h4 className="profile__name">{profile.fullName}</h4>
                {!editMode &&
                    <span className="profile__status" onClick={() => setEditMode(true)} >
                        {profile.aboutMe ? profile.aboutMe : '-'}</span>
                }
                {editMode &&
                    <form className="profile__form">
                        <input autoFocus={true} onBlur={() => setEditMode(false)} className="profile__form-input" type="text" placeholder="Hello, I'm a junior React developer" />
                    </form>
                }


            </div>}

            {profile && <div className="profile__about">
                <ul className="profile__about-list">
                    <li className="profile__about-item">
                        <p className="profile__about-contact">Szukam pracy:</p>
                        <span className="profile__about-span">{profile.lookingForAJob ? 'Tak' : 'Nie'}</span>
                    </li>
                    <li className="profile__about-item">
                        <p className="profile__about-contact">GitHub: </p>
                        <span className="profile__about-span">{profile.contacts.github ? profile.contacts.github : '-'}</span>
                    </li>
                    <li className="profile__about-item">
                        <p className="profile__about-contact">Facebook:</p>
                        <span className="profile__about-span">{profile.contacts.facebook ? profile.contacts.facebook : '-'}</span>
                    </li>
                    <li className="profile__about-item">
                        <p className="profile__about-contact">Instagram:</p>
                        <span className="profile__about-span">{profile.contacts.instagram ? profile.contacts.instagram : '-'}</span>
                    </li>
                </ul>
            </div>}


        </div>
    )
}

export default ProfileInfo
