import { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import { AppStoreType } from './redux/store';
import { initializedTC } from './redux/reducers/app-reducer';

import { Login } from './screens';
import { Header, Sidebar, Content } from './component';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    margin: '20px auto',
    width: '1100px',

    [theme.breakpoints.down('lg')]: {
      width: '98%',
    },
  },

  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100vh',
  },
}));

export const App = () => {
  const { initialized } = useSelector(({ app }: AppStoreType) => app);
  const { isAuth } = useSelector(({ auth }: AppStoreType) => auth);
  const dispatch = useDispatch();
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();

  const isLoginPage = location.pathname === '/login';

  useEffect(() => {
    dispatch(initializedTC());
  }, [dispatch]);

  if (!initialized) {
    return (
      <div className={classes.wrapper}>
        <CircularProgress />
      </div>
    );
  }

  if (!isAuth) {
    if (!isLoginPage) {
      navigate('/login');
    }

    return (
      <div className={classes.wrapper}>
        <Routes>
          <Route path='/login' element={<Login />} />
        </Routes>
      </div>
    );
  }

  if (isLoginPage) {
    navigate('/profile');
  }

  return (
    <>
      <Header />
      <div className={classes.container}>
        <Sidebar />
        <Content />
      </div>
    </>
  );
};
