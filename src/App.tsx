import { useEffect } from "react"
import { Navigate, Route, Routes} from "react-router-dom";
import { useSelector,  useDispatch} from "react-redux";

import { Chats, Header, ProfileLoader, Login, Sidebar, Users, Profile } from './component';
import { initializedTC } from './redux/reducers/app-reducer'
import { AppStoreType } from './redux/store';
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    width: '70%',
    margin: '20px auto',
    display: 'flex',

    [theme.breakpoints.down('lg')]: {
      width: '100%',
    }
  },

  content: {
    width: '100%',
    margin: '0 20px'
  },

  wrapper: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export const  App = () => {
  const { initialized } = useSelector(({ app }: AppStoreType) => app);
  const { isAuth } = useSelector(({ auth }: AppStoreType) => auth);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(initializedTC())
  }, [dispatch])

  if (!initialized) {
      return  <div className ={classes.wrapper} ><ProfileLoader/></div> 
  }

  return (
    <>
      { !isAuth
        ? <div className ={classes.wrapper}>
              <Routes>
                  <Route path='/login' element={<Login/>}/> 
                  <Route path='/' element={<Navigate to="/login" replace />}/> 
              </Routes>
          </div> 
        : <>
            <Header/>
            <div className={classes.container}>
              <Sidebar/>
              <div className={classes.content}>
                <Routes>
                  <Route path='/profile' element={<Profile/>}/>
                  <Route path='/profile/:userId' element={<Profile/>}/>
                  <Route path='/chats' element={<Navigate to="/chats/1" replace />}/>
                  <Route path='/chats/:id' element={<Chats/>}/>
                  <Route path='/users' element={<Users/>}/> 
                </Routes>
              </div>
            </div> 
          </>
      }
    </>
  );
};
