import { useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';

import { ProfileLeftPanel, ProfileRightPanel } from './components';

import { AppStoreType } from '../../../redux/store';

const useStyles = makeStyles({
  profile: {
    display: 'flex',
  },
});

export const Profile = () => {
  const { profile, isFeaching } = useSelector(({ profile }: AppStoreType) => profile);
  const classes = useStyles();

  return (
    <div className={classes.profile}>
      <ProfileLeftPanel profilePhoto={profile?.photos.large} isFeaching={isFeaching} />
      <ProfileRightPanel isFeaching={isFeaching} profile={profile} />
    </div>
  );
};
