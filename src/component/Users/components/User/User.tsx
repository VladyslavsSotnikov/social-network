import { VFC } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import man from '../../../../assests/man.svg';
import { UserType } from '../../../../models';
import { makeStyles } from '@mui/styles';
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

  avatar: {
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
  name: {
    fontSize: '12px',
    color: '#2A5885',
    fontWeight: 'bold',
    marginBottom: '7px',
  },

  status: {
    display: 'block',
    color: 'grey',
    fontWeight: 'normal',
    fontSize: '12px',
    marginTop: '5px',
  },
});

export const User: VFC<UserProps> = ({ id, name, status, photo, followed, follow, unfollow, followingInProgress }) => {
  const classes = useStyles();

  const isDisabledButton = followingInProgress.some((userId) => userId === id);

  return (
    <div className={classes.user}>
      <div className={classes.avatar}>
        <Link to={`/profile/${id}`}>
          <img src={photo ? photo : man} alt='user' />
        </Link>
        <button
          onClick={!followed ? () => follow(id) : () => unfollow(id)}
          className={classNames('user__btn', { 'user__btn-disabled': isDisabledButton })}
        >
          {!followed ? 'Dodaj' : 'Usuń'}
        </button>
      </div>
      <div>
        <Link className={classes.name} to={`/profile/${id}`}>
          {name}
        </Link>
        {status && <span className={classes.status}>{status}</span>}
      </div>
    </div>
  );
};
