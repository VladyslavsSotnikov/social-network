import { Fragment, useEffect } from "react"
import { Navigate, Route, Routes, useLocation} from "react-router-dom";
import { useSelector,  useDispatch} from "react-redux";

import { Chats, Header, ProfileLoader, Login, Sidebar, Users, Profile } from './component';
import { initializedTC } from './redux/reducers/app-reducer'
import { AppStoreType } from './redux/store';
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";
import { resetProfileState, resetUsersState } from "./redux/reducers";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    margin: '20px auto',
    width: '1100px',

    [theme.breakpoints.down('lg')]: {
      width: '98%',
    }
  },

  content: {
    width: '100%',
    margin: '0 20px',
  },

  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100vh',
  },
}));

export const  App = () => {
  const { initialized } = useSelector(({ app }: AppStoreType) => app);
  const { isAuth } = useSelector(({ auth }: AppStoreType) => auth);
  const dispatch = useDispatch();
  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    dispatch(initializedTC())
  }, [dispatch])

  useEffect(()=> {
    if(location.pathname !== '/profile'){
      dispatch(resetProfileState())
    }
    if(location.pathname !== '/users'){
      dispatch(resetUsersState());
    }
  }, [location.pathname, dispatch])

  if (!initialized) {
      return  <div className ={classes.wrapper} ><ProfileLoader/></div> 
  }

  return (
    <Fragment>
      { !isAuth
        ? <div className ={classes.wrapper}>
              <Routes>
                  <Route path='/login' element={<Login/>}/> 
                  <Route path='/' element={<Navigate to="/login" replace />}/> 
              </Routes>
          </div> 
        : <Fragment>
            <Header/>
              <div className={classes.container}>
                <Sidebar/>
                <div className={classes.content}>
                  <Routes>
                    <Route path='/profile' element={<Profile/>}/>
                    <Route path='/profile/:userId' element={<Profile/>}/>
                    <Route path='/' element={<Navigate to="/profile" replace />}/>
                    <Route path='/chats' element={<Navigate to="/chats/1" replace />}/>
                    <Route path='/chats/:id' element={<Chats/>}/>
                    <Route path='/users' element={<Users/>}/> 
                  </Routes>
                </div>
              </div> 
          </Fragment>
      }
    </Fragment>
  );
};
