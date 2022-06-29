import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { Avatar } from '@mui/material';

import { logout } from '../../redux/reducers/auth-reducer';
import { AppStoreType } from '../../redux/store';

import logo from '../../assests/logo.svg';
import profilePhoto from '../../assests/man.svg';

const useStyle = makeStyles({
  root: {
    backgroundColor: '#4A76A8',
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: ' 0px 60px 0 60px',
  },

  authInfo: {
    display: 'flex',
    alignItems: 'center',
  },

  userName: {
    color: '#fff',
    fontWeight: 'bold',
    letterSpacing: '1px',
  },

  profilePhoto: {
    width: '30px',
    height: '30px',
    margin: '0 25px',

    '&>img': {
      width: '100%',
    },
  },

  logout: {
    color: 'white',
    border: '2px solid white ',
    borderRadius: '40px',
    padding: '7px 25px',
    backgroundColor: 'transparent',
    fontSize: '16px',

    '&:hover': {
      cursor: 'pointer',
      filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
    },
  },
});

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userData } = useSelector(({ auth }: AppStoreType) => auth);
  const { avatar } = useSelector(({ profile }: AppStoreType) => profile);
  const classes = useStyle();

  const onClickLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <img src={logo} alt='logo' />
        <div className={classes.authInfo}>
          <div className={classes.userName}>{userData?.login}</div>
          <div className={classes.profilePhoto}>
            <Avatar src={avatar ?? profilePhoto} sx={{ width: 30, height: 30 }} alt='profilePhoto' />
          </div>
          <button className={classes.logout} onClick={onClickLogout}>
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};
