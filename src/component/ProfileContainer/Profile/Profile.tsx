import { VFC } from 'react';
import { makeStyles } from '@mui/styles';
import { ProfileLeftPanel, ProfileRightPanel } from './components';
import { useSelector } from 'react-redux';
import { AppStoreType } from '../../../redux/store';

interface ProfileProps {
  authorizedUserId?: number;
  userId: number;
}

const useStyles = makeStyles({
  profile: {
    display: 'flex',
  },
});

export const Profile: VFC<ProfileProps> = ({ authorizedUserId, userId }) => {
  const { profile, isFeaching } = useSelector(({ profile }: AppStoreType) => profile);
  const classes = useStyles();

  return (
    <div className={classes.profile}>
      <ProfileLeftPanel profilePhoto={profile?.photos.large} isFeaching={isFeaching} />
      <ProfileRightPanel isFeaching={isFeaching} profile={profile} />
    </div>
  );
};
