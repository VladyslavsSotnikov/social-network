import { makeStyles } from '@mui/styles';
import { VFC } from 'react';

type PropsType = {
  userId: number;
  followed: boolean;
  follow: (id: number) => void;
  unfollow: (id: number) => void;
  isDisabledButton: boolean;
};

type ButtonType = {
  isDisabledButton: boolean;
};

const useStyles = makeStyles({
  button: ({ isDisabledButton }: ButtonType) => ({
    backgroundColor: !isDisabledButton ? '#5181b8' : '#d5d5d6',
    pointerEvents: isDisabledButton ? 'none' : 'auto',
    cursor: isDisabledButton ? 'none' : 'pointer',
    border: 'none',
    borderRadius: '2px',
    color: '#fff',
    padding: '8px 0',

    '&:hover': {
      backgroundColor: '#6a98cc',
    },
  }),
});

export const FollowingButton: VFC<PropsType> = ({ follow, unfollow, followed, userId, isDisabledButton }) => {
  const classes = useStyles({ isDisabledButton });
  return (
    <button className={classes.button} onClick={!followed ? () => follow(userId) : () => unfollow(userId)}>
      {!followed ? 'Dodaj' : 'Usuń'}
    </button>
  );
};
