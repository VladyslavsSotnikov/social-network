import { useEffect } from "react"
import { Navigate, Route, Routes} from "react-router-dom";
import { useSelector,  useDispatch} from "react-redux";

import { Chats, Header, ProfileLoader, Login, Sidebar, Users, Profile } from './component';
import { initializedTC } from './redux/reducers/app-reducer'
import { AppStoreType } from './redux/store';

export const  App = () => {
  const { initialized } = useSelector(({ app }: AppStoreType) => app);
  const { isAuth } = useSelector(({ auth }: AppStoreType) => auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializedTC())
  }, [dispatch])

  if (!initialized) {
      return  <div className ="content__wrapper" ><ProfileLoader/></div> 
  }

  return (
    <div>
      { !isAuth
        ? <div className ="content__wrapper">
              <Routes>
                  <Route path='/login' element={<Login/>}/> 
                  <Route path='/' element={<Navigate to="/login" replace />}/> 
              </Routes>
          </div> 
        : <div>
            <Header/>
            <div className="conteiner">
              <Sidebar/>
              <div className="content">
                <Routes>
                  <Route path='/profile' element={<Profile/>}/>
                  <Route path='/profile/:userId' element={<Profile/>}/>
                  <Route path='/chats' element={<Navigate to="/chats/1" replace />}/>
                  <Route path='/chats/:id' element={<Chats/>}/>
                  <Route path='/users' element={<Users/>}/> 
                </Routes>
              </div>
            </div> 
          </div>
      }
    </div>
  );
};
