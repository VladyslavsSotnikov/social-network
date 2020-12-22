import React from 'react'
import EditProfileForm from './EditProfileForm/EditProfileForm'
import { saveProfile } from '../../../redux/reducers/profile-reducer'
import { useDispatch } from 'react-redux'
function EditProfile({ setEditMode, profile }) {
    const dispatch = useDispatch()
    const saveProfileInfo = values => {
        dispatch(saveProfile(values, profile.userId)).then(() => setEditMode(false))
    }

    return (
        <div className="profile__edit-profile">
            <div className="profile__edit-content">
                <div className="profile__btn-container">
                    <div className="profile__btn--circle" onClick={() => setEditMode(false)}>
                        <svg
                            id="Capa_1"
                            enable-background="new 0 0 512.001 512.001"
                            height="10"
                            viewBox="0 0 512.001 512.001"
                            width="10"
                            fill="#5181B8"
                            xmlns="http://www.w3.org/2000/svg">

                            <g>
                                <path d="m512.001 84.853-84.853-84.853-171.147 171.147-171.148-171.147-84.853 84.853 171.148 171.147-171.148 171.148 84.853 84.853 171.148-171.147 171.147 171.147 84.853-84.853-171.148-171.148z" />
                            </g>
                        </svg>
                    </div>

                </div>
                <EditProfileForm initialValues={profile} profile={profile} onSubmit={saveProfileInfo} />
            </div>
        </div>
    )
}

export default EditProfile
