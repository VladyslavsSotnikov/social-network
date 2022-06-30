import { VFC } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@mui/styles';

import { CloseButton, EditProfileForm } from './components';
import { saveProfile } from '../../../../../../../../../redux/reducers';
import { ProfileDataType } from '../../../../../../../../../models';

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
    zIndex: 100,
  },

  wrapper: {
    width: '400px',
    height: 'auto',
    backgroundColor: '#fff',
    borderRadius: '5px',
  },
});

export const EditProfile: VFC<EditProfileProps> = ({ setEditMode, profile }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const saveProfileInfo = (values: ProfileDataType) => {
    if (profile?.userId) {
      const promise = dispatch(saveProfile(values, profile.userId));
      Promise.all([promise]).then(() => setEditMode(false));
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <CloseButton setEditMode={setEditMode} />
        <EditProfileForm initialValues={profile ?? undefined} profile={profile} onSubmit={saveProfileInfo} />
      </div>
    </div>
  );
};
