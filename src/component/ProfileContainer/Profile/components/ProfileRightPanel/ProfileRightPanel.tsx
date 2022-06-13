import { makeStyles } from '@mui/styles';
import { VFC } from 'react';
import { ProfileDataType } from '../../../../../models';
import { ProfileInfo, ProfileInfoLoader, ProfilePosts } from './components';

type PropsType = {
  isFeaching: boolean;
  profile: ProfileDataType | null;
};

const useStyles = makeStyles({
  root: {
    flex: 1,
  },

  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
});

export const ProfileRightPanel: VFC<PropsType> = ({ isFeaching, profile }) => {
  const classes = useStyles();

  if (isFeaching) {
    return (
      <div className={classes.root}>
        <ProfileInfoLoader />
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <ProfileInfo profile={profile} />
      <ProfilePosts />
    </div>
  );
};
