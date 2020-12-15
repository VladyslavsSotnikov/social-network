import Chats from "./component/Chats/Chats";
import Users from "./component/Users/Users";
import Header from "./component/Header/Header";
import Profile from "./component/Profile/Profile";
import Sidebar from "./component/Sidebar/Sidebar";
import { Route } from "react-router-dom";

function App() {
  return (
    <div >
      <Header/>
      <div className="conteiner">
        <Sidebar/>
        <div className="content">
          <Route path='/profile/:userId?'> <Profile/> </Route>
          <Route path='/chats'> <Chats/></Route>
          <Route path='/users'><Users/></Route>
        </div>
      </div>
    </div>
  );
}

export default App;
