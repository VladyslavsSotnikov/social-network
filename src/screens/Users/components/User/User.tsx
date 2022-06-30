import { VFC } from 'react';
import { makeStyles } from '@mui/styles';

import { UserType } from '../../../../models';

import { UserLeftPanel } from './components/UserLeftPanel/UserLeftPanel';
import { UserRightPanel } from './components/UserRightPanel/UserRightPanel';
interface UserProps extends UserType {
  photo?: string | null;
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
  followingInProgress: number[];
}

const useStyles = makeStyles({
  user: {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: '15px',
    width: '200px',
    overflow: 'hidden',
  },
});

export const User: VFC<UserProps> = ({ id, name, status, photo, followed, follow, unfollow, followingInProgress }) => {
  const isDisabledButton = followingInProgress.some((userId) => userId === id);
  const classes = useStyles({ isDisabledButton });

  return (
    <div className={classes.user}>
      <UserLeftPanel
        userId={id}
        userPhoto={photo}
        followed={followed}
        follow={follow}
        unfollow={unfollow}
        isDisabledButton={isDisabledButton}
      />
      <UserRightPanel name={name} status={status} userId={id} />
    </div>
  );
};
