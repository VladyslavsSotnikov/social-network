import { useEffect, useState, VFC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@mui/styles';

import { EditProfile, ProfileDescription } from './components';
import { ProfileDataType } from '../../../../../models';
import { updateStatus } from '../../../../../redux/reducers';
import { AppStoreType } from '../../../../../redux/store';

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
  },

  name: {
    marginBottom: '10px',
  },

  status: ({ isAuthorizedUser }: { isAuthorizedUser: boolean }) => ({
    display: 'block',
    width: '100%',
    padding: '7px 0',
    height: '25px',
    maxWidth: '685px',
    overflow: 'hidden',

    '&:hover': {
      backgroundColor: isAuthorizedUser ? '#D5D5D6' : 'transparent',
      cursor: isAuthorizedUser ? 'pointer' : 'context-menu',
    },
  }),

  statusInput: {
    width: '100%',
    border: '1px solid #DDDDDD',
    marginBottom: '8px',
    padding: '5px 10px',
    borderRadius: '2px',
  },
});

export const ProfileInfo: VFC<ProfileInfoProps> = ({ profile, currentUserId, authUserId }) => {
  const isAuthorizedUser = currentUserId === authUserId;

  const dispatch = useDispatch();
  const { status } = useSelector(({ profile }: AppStoreType) => profile);
  const [editMode, setEditMode] = useState(false);
  const [localStatus, setLocalStatus] = useState(status);
  const [profileEditMode, setProfileEditMode] = useState(false);
  const classes = useStyles({ isAuthorizedUser });

  const onBlurStatus = () => {
    setEditMode(false);
    if (status !== localStatus && profile?.userId) {
      dispatch(updateStatus(localStatus, profile.userId));
    }
  };

  const openEditProfileDialog = () => setProfileEditMode(true);

  useEffect(() => {
    setLocalStatus(status);
  }, [status]);

  return (
    <div className={classes.profileInfo}>
      {profile && (
        <div className={classes.info}>
          <h4 className={classes.name}>{profile.fullName}</h4>
          {isAuthorizedUser ? (
            !editMode ? (
              <span className={classes.status} onClick={() => setEditMode(true)}>
                {status ? status : null}
              </span>
            ) : (
              <input
                autoFocus={true}
                onBlur={onBlurStatus}
                className={classes.statusInput}
                type='text'
                placeholder={status}
                value={localStatus}
                onChange={(e) => setLocalStatus(e.target.value)}
              />
            )
          ) : (
            <span className={classes.status}>{status ? status : 'Ja jeszcze nie mam statusu :('}</span>
          )}
        </div>
      )}
      <ProfileDescription
        profile={profile}
        isAuthorizedUser={isAuthorizedUser}
        openEditProfileDialog={openEditProfileDialog}
      />
      {profileEditMode && <EditProfile setEditMode={setProfileEditMode} profile={profile} />}
    </div>
  );
};
