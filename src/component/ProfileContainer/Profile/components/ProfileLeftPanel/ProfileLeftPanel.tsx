import { makeStyles } from '@mui/styles';
import { VFC } from 'react';
import { ProfilePhoto, ProfilePhotoLoader } from './components';

type PropsType = {
  profilePhoto?: string | null;
  isFeaching: boolean;
  isAuthorizedUser: boolean;
  userId: number;
};

const useStyles = makeStyles({
  root: {
    width: '230px',
    marginRight: '25px',
  },
});

export const ProfileLeftPanel: VFC<PropsType> = ({ profilePhoto, isFeaching, isAuthorizedUser, userId }) => {
  const classes = useStyles();

  if (isFeaching) {
    return (
      <div className={classes.root}>
        <ProfilePhotoLoader />
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <ProfilePhoto profilePhoto={profilePhoto} isAuthorizedUser={isAuthorizedUser} userId={userId} />
    </div>
  );
};
