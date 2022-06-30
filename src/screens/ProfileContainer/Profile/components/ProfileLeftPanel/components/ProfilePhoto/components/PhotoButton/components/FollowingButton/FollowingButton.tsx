import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';

import { follow, unfollow } from '../../../../../../../../../../../redux/reducers';
import { AppStoreType } from '../../../../../../../../../../../redux/store';

type ButtonTypes = {
  followingInProgres: boolean;
};

const useStyles = makeStyles({
  button: ({ followingInProgres }: ButtonTypes) => ({
    width: '100%',
    padding: '8px 0',
    border: 'none',
    borderRadius: '2px',
    color: '#fff',
    pointerEvents: followingInProgres ? 'none' : 'auto',
    backgroundColor: followingInProgres ? '#D5D5D6' : '#5181B8',
    cursor: followingInProgres ? 'none' : 'pointer',
    display: 'block',
    textAlign: 'center',

    '&:hover': {
      backgroundColor: followingInProgres ? '#D5D5D6' : '#5181B8',
    },
  }),
});

export const FollowingButton = () => {
  const { followingInProgres, followInfo, userId } = useSelector(({ profile }: AppStoreType) => profile);
  const classes = useStyles({ followingInProgres });
  const dispatch = useDispatch();

  const onClickFollow = (userId: number) => {
    dispatch(follow(userId));
  };

  const onClickUnfollow = (userId: number) => {
    dispatch(unfollow(userId));
  };

  if (!followInfo) {
    return (
      <button className={classes.button} onClick={() => onClickFollow(userId)}>
        Dodaj
      </button>
    );
  }

  return (
    <button className={classes.button} onClick={() => onClickUnfollow(userId)}>
      Usuń
    </button>
  );
};
