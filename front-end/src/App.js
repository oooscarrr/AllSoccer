// import logo from "./logo.svg";
import "./App.css";
import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./js/Home";
import Header from "./js/Header";
import PlayerProfile from "./js/PlayerProfile";
import LoginRegister from "./js/LoginRegister";
import CreateTeam from "./js/CreateTeam";
import CreateMatch from "./js/CreateMatch";
import FindMatch from "./js/FindMatch";


const App = (props) => {
  const [user, setUser] = useState(null);
  const [team, setTeam] = useState(null);

  return (
    <div className="App">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <Router>
        <Header user={user}/>
        <Routes>
          {/*home page*/}
          <Route path="/" element={<Home title="Home | All Soccer" user={user}/>}/>
          <Route path="/profile" element={<PlayerProfile title="Profile | All Soccer" user={user} setUser={setUser}/>}/>
          <Route path="/loginRegister" element={<LoginRegister title="Login/Register | All Soccer" user={user} setUser={setUser} team={team} setTeam={setTeam}/>}/>
          <Route path="/createTeam" element={<CreateTeam title="Create Team | All Soccer" user={user} setUser={setUser}/>}/>
          <Route path="/createMatch" element={<CreateMatch title="Create Match | All Soccer" user={user} setUser={setUser}/>}/>
          <Route path="/findMatch" element={<FindMatch title="Find Match | All Soccer" user={user} team={team}/>}/>
        </Routes>
      </Router>
    </div>
  );
}


export default App;
