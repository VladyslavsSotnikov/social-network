import { makeStyles } from '@mui/styles';
import { VFC } from 'react';
import { ProfilePhoto, ProfilePhotoLoader } from './components';

type PropTypes = {
  profilePhoto?: string | null;
  isFeaching: boolean;
};

const useStyles = makeStyles({
  root: {
    width: '230px',
    marginRight: '25px',
  },
});

export const ProfileLeftPanel: VFC<PropTypes> = ({ profilePhoto, isFeaching }) => {
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
      <ProfilePhoto profilePhoto={profilePhoto} />
    </div>
  );
};
