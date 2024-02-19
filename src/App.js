import React from "react";
import './App.css';

 import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
 import {useAuthState} from 'react-firebase-hooks/auth'
 import {auth} from "./firebase";

 import Navbar from "./components/Navbar/Navbar";
 import Enter from "./components/enter/Enter"
import Contacts from "./components/Contacts/Contacts";
import Chats from "./components/Chats/Chats";
import Profile from "./components/Profile/Profile";
import ChatScreen from "./components/ChatScreen/ChatScreen";
import Square from "./components/Square/Square";


function App() {
  const [user] = useAuthState(auth);
  


        

  return (
    <div className="App">
    <Router>
      <Navbar/>
      {user?<>
      <Routes>
        <Route path="/" element={<Chats/>} />
        <Route path="/add" element={<Contacts/>}/>
        <Route path="/profile" element={<Profile/>} />
        <Route path="/square" element={<Square/>} />
        <Route path="/:id" element={<ChatScreen/>}/>
      </Routes>
      </>:<Enter/>}
    </Router>
    <div className="bounce animated infinite"><img src={require('./logo.png')} alt="kirby" className="Kirby" /></div>
    </div>
  );
}


export default App;
