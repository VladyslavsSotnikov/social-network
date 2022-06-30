import { VFC } from 'react';
import { makeStyles } from '@mui/styles';

import { FollowingButton, UserPhoto } from './components';

type PropTypes = {
  userId: number;
  userPhoto?: string | null;
  followed: boolean;
  follow: (id: number) => void;
  unfollow: (id: number) => void;
  isDisabledButton: boolean;
};

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: '20px',
    width: '80px',

    '& img': {
      display: 'block',
      width: '80px',
      height: '80px',
      borderRadius: '100%',
      marginBottom: '7px',
    },
  },
});

export const UserLeftPanel: VFC<PropTypes> = ({ userId, userPhoto, follow, followed, isDisabledButton, unfollow }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <UserPhoto userId={userId} userPhoto={userPhoto} />
      <FollowingButton
        userId={userId}
        follow={follow}
        followed={followed}
        isDisabledButton={isDisabledButton}
        unfollow={unfollow}
      />
    </div>
  );
};
