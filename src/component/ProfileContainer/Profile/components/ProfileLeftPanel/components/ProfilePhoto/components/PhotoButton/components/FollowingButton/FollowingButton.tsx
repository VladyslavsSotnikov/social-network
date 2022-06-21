import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { follow, unfollow } from '../../../../../../../../../../../redux/reducers';
import { AppStoreType } from '../../../../../../../../../../../redux/store';

type ButtonType = {
  followingInProgres: boolean;
};

const useStyles = makeStyles({
  commonButton: ({ followingInProgres }: ButtonType) => ({
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
      <button className={classes.commonButton} onClick={() => onClickFollow(userId)}>
        Dodaj
      </button>
    );
  }

  return (
    <button className={classes.commonButton} onClick={() => onClickUnfollow(userId)}>
      Usuń
    </button>
  );
};