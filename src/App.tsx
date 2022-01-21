import { useEffect } from "react"
import { Navigate, Route, Routes, useLocation} from "react-router-dom";
import { useSelector,  useDispatch} from "react-redux";

import { Chats, Header, ProfileLoader, Login, Sidebar, Profile, Users } from './component';
import { initializedTC } from './redux/reducers/app-reducer'
import { AppStoreType } from './redux/store';

export const  App = () => {
  const { initialized } = useSelector(({ app }: AppStoreType) => app)
  const { isAuth } = useSelector(({ auth }: AppStoreType) => auth)
  const dispatch = useDispatch()
  const location = useLocation();

  useEffect(() => {
    dispatch(initializedTC())
  }, [dispatch])
  
  if (!initialized) {
      return  <div className ="content__wrapper" ><ProfileLoader/></div> 
  }

  if (location.pathname === '/') {
    return <Navigate to="/profile"/>
  }

  if (location.pathname === '/chats') {
    return <Navigate to = "/chats/1"/>
  }

  return (
    <div>
      {
        !isAuth
        ? <div className ="content__wrapper"><Login/></div> 
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
