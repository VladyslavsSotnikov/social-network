import React , { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation} from "react-router-dom";
import { useSelector,  useDispatch} from "react-redux";
import { initializedTC } from './redux/reducers/app-reducer'


import Chats from "./component/Chats/Chats";
import Users from "./component/Users/Users";
import Header from "./component/Header/Header";
import Profile from "./component/Profile/Profile";
import Sidebar from "./component/Sidebar/Sidebar";
import Login from './component/Login/Login'
import ProfileLoader from './component/Loader/ProfileLoader/ProfileLoader';

function App() {
  const { initialized } = useSelector(({app}) => app)
  const { isAuth } = useSelector(({auth}) => auth)
  const dispatch = useDispatch()
  const location = useLocation();

  useEffect(() => {
    initializedTC()(dispatch)
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
                  {/* <Route path='/chats' element={<Chats/>}/> */}
                  <Route path='/users' element={<Users/>}/> 
                </Routes>
              </div>
            </div> 
          </div>
      }
      

    </div>
  );
}

export default App;
