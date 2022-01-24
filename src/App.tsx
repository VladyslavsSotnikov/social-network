import { useEffect } from "react"
import { Navigate, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import { useSelector,  useDispatch} from "react-redux";

import { Chats, Header, ProfileLoader, Login, Sidebar, Users, Profile } from './component';
import { initializedTC } from './redux/reducers/app-reducer'
import { AppStoreType } from './redux/store';

export const  App = () => {
  const { initialized } = useSelector(({ app }: AppStoreType) => app);
  const { isAuth } = useSelector(({ auth }: AppStoreType) => auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate =  useNavigate();

  useEffect(() => {
    dispatch(initializedTC())
  }, [dispatch])
  
  useEffect(() => {
    console.log('isAuth', isAuth);
    if (!isAuth) {
      navigate('/login');
    }
  },[isAuth, navigate])

  if (!initialized) {
      return  <div className ="content__wrapper" ><ProfileLoader/></div> 
  }

  if (location.pathname === '/chats') {
    return <Navigate to = "/chats/1"/>
  }

  return (
    <div>
      { !isAuth
        ? <div className ="content__wrapper">
              <Routes>
                  <Route path='/login' element={<Login/>}/> 
              </Routes>
          </div> 
        : <div>
            <Header/>
            <div className="conteiner">
              <Sidebar/>
              <div className="content">
                <Routes>
                  <Route  path='/profile' element={<Profile/>}>
                    <Route  path=':userId' element={<Profile/>}/>
                  </Route> 
                  <Route  path='/chats' element={<Chats/>}>
                    <Route  path=':id' element={<Chats/>}/>
                  </Route>
                  <Route path='/users' element={<Users/>}/> 
                </Routes>
              </div>
            </div> 
          </div>
      }
    </div>
  );
};
