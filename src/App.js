import React , { useEffect } from 'react'
import { Redirect, Route, withRouter} from "react-router-dom";
import { useSelector,  useDispatch} from "react-redux";
import { initializedTC } from './redux/reducers/app-reducer'


import Chats from "./component/Chats/Chats";
import Users from "./component/Users/Users";
import Header from "./component/Header/Header";
import Profile from "./component/Profile/Profile";
import Sidebar from "./component/Sidebar/Sidebar";
import Login from './component/Login/Login'
import ProfileLoader from './component/Loader/ProfileLoader/ProfileLoader';

function App({location}) {
  const { initialized } = useSelector(({app}) => app)
  const { isAuth } = useSelector(({auth}) => auth)
  const dispatch = useDispatch()
  
  useEffect(() => {
    initializedTC()(dispatch)
  }, [dispatch])

  if (!initialized) {
      return  <div className ="content__wrapper" ><ProfileLoader/></div> 
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
                {location.pathname === '/' && <Redirect to="/profile"/>}
                <Route path='/profile/:userId?'> <Profile/> </Route>
                {location.pathname === '/chats' && <Redirect to = "/chats/1"/>}
                <Route path='/chats'> <Chats/></Route>
                <Route path='/users'><Users/></Route>
              </div>
            </div> 
          </div>
      }
      

    </div>
  );
}

export default withRouter(App) ;
