import { useState, VFC } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';

import { EditProfile, ProfileDescription, ProfileHeader, Status } from './components';
import { ProfileDataType } from '../../../../../../../models';
import { AppStoreType } from '../../../../../../../redux/store';

type ProfileInfoProps = {
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

export const ProfileInfo: VFC<ProfileInfoProps> = ({ profile }) => {
  const { isAuthorizedUser } = useSelector(({ profile }: AppStoreType) => profile);

  const openEditProfileDialog = () => setProfileEditMode(true);
  const [profileEditMode, setProfileEditMode] = useState(false);
  const classes = useStyles({ isAuthorizedUser });

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