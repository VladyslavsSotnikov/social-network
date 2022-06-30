import { useState, VFC } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';

import { EditProfile, ProfileDescription, ProfileHeader, Status } from './components';
import { ProfileDataType } from '../../../../../../../models';
import { AppStoreType } from '../../../../../../../redux/store';

type PropTypes = {
  profile: ProfileDataType | null;
  currentUserId?: number;
  authUserId?: number;
};

const useStyles = makeStyles({
  profileInfo: {
    backgroundColor: '#fff',
    borderRadius: '5px',
    padding: '15px',
    marginBottom: '11px',
  },

  info: {
    borderBottom: '1px solid #D5D5D6',
    paddingBottom: '10px',
    marginBottom: '10px',
  },
});

export const ProfileInfo: VFC<PropTypes> = ({ profile }) => {
  const { isAuthorizedUser } = useSelector(({ profile }: AppStoreType) => profile);
  const [profileEditMode, setProfileEditMode] = useState(false);
  const classes = useStyles({ isAuthorizedUser });

  const openEditProfileDialog = () => setProfileEditMode(true);

  return (
    <div className={classes.profileInfo}>
      <div className={classes.info}>
        <ProfileHeader fullName={profile?.fullName} />
        <Status isAuthorizedUser={isAuthorizedUser} />
      </div>
      <ProfileDescription
        profile={profile}
        isAuthorizedUser={isAuthorizedUser}
        openEditProfileDialog={openEditProfileDialog}
      />
      {profileEditMode && <EditProfile setEditMode={setProfileEditMode} profile={profile} />}
    </div>
  );
};
