import { Fragment, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

import { Header, ProfileLoader, Login, Sidebar, Content } from './component';
import { initializedTC } from './redux/reducers/app-reducer';
import { AppStoreType } from './redux/store';
import { resetProfileState, resetUsersState } from './redux/reducers';

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

  useEffect(() => {
    dispatch(initializedTC());
  }, [dispatch]);

  useEffect(() => {
    if (location.pathname !== '/profile') {
      dispatch(resetProfileState());
    }
    if (location.pathname !== '/users') {
      dispatch(resetUsersState());
    }
  }, [location.pathname, dispatch]);

  if (!initialized) {
    return (
      <div className={classes.wrapper}>
        <ProfileLoader />
      </div>
    );
  }

  if (!isAuth) {
    const isLoginPage = location.pathname === '/login';

    if (!isLoginPage) {
      return <Navigate to='/login' replace />;
    }

    return (
      <div className={classes.wrapper}>
        <Routes>
          <Route path='/login' element={<Login />} />
        </Routes>
      </div>
    );
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
