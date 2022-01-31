import { makeStyles } from "@mui/styles";
import { VFC } from "react";
import { useDispatch } from "react-redux";

import { ProfileDataType } from '../../../../../../models';
import { saveProfile } from '../../../../../../redux/reducers';
import { EditProfileForm } from './components';
import { Close } from "./icons";

type EditProfileProps = {
    setEditMode: (isEditMode: boolean) => void;
    profile: ProfileDataType | null;
};

const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        position: 'fixed',
        top: '0',
        left: '0',
    },

    wrapper: {
        width: '400px',
        height: 'auto',
        backgroundColor: '#fff',
        padding: '10px 10px 2px 30px',
        borderRadius: '5px',
    },

    buttonWrapper: {
        display: 'flex',
        justifyContent:' flex-end',
    },

    closeButton: {
        width: '30px',
        height: '30px',
        borderRadius: '100%',
        border: '1px solid #5181B8',
        backgroundColor: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '10px',
        transition: 'all .15s ease-in-out',

        '&:hover': {
            cursor: 'pointer',
            backgroundColor: '#5181B8',
            '&>svg': {
                fill: '#fff',
            }
        }
    },
    
});

export const EditProfile: VFC<EditProfileProps> = ({ setEditMode, profile }) => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const saveProfileInfo = (values: ProfileDataType ) => {
        if( profile?.userId) {
            const promise = dispatch(saveProfile(values, profile.userId));
            Promise.all([promise]).then(() => setEditMode(false));
        } 
    };

    return (
        <div className={classes.root}>
            <div className={classes.wrapper}>
                <div className={classes.buttonWrapper}>
                    <button className={classes.closeButton} onClick={() => setEditMode(false)}>
                        <Close/>
                    </button>
                </div>
                <EditProfileForm initialValues={profile?? undefined} profile={profile} onSubmit={saveProfileInfo} />
            </div>
        </div>
    )
};