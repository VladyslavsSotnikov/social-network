import { VFC } from "react"
import { useDispatch } from 'react-redux'

import EditProfileForm from './EditProfileForm/EditProfileForm'
import { saveProfile } from '../../../redux/reducers/profile-reducer'
import { ProfileDataType } from "../../../models"

type EditProfileProps = {
    setEditMode: (isEditMode: boolean) => void;
    profile: ProfileDataType | null;
}

const EditProfile: VFC<EditProfileProps> = ({ setEditMode, profile }) => {
    const dispatch = useDispatch()
    
    const saveProfileInfo = (values: ProfileDataType ) => {
        if( profile?.userId) {
            const promise = dispatch(saveProfile(values, profile.userId));
            Promise.all([promise]).then(() => setEditMode(false));
        } 
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
                <EditProfileForm initialValues={profile?? undefined} profile={profile} onSubmit={saveProfileInfo} />
            </div>
        </div>
    )
}

export default EditProfile
