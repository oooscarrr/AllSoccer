// import logo from "./logo.svg";
import "./App.css";
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./js/Home";
import Header from "./js/Header";
import PlayerProfile from "./js/PlayerProfile";


const App = (props) => {
  return (
    <div className="App">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <Router>
        <Header />
        <Routes>
          {/*home page*/}
          <Route path="/" element={<Home title="Home | All Soccer"/>}/>
          <Route path="/playerProfile" element={<PlayerProfile title="Player Profile | All Soccer"/>}/>
        </Routes>
      </Router>
    </div>
  );
}

// function App() {
// return (
// 	<div className="App">
// 	<header className="App-header">
// 		<img src={logo} className="App-logo"
// 			alt="logo" />
		
// <p>A simple React app.....</p>

// 		<a
// 		className="App-link"
// 		href="https://reactjs.org"
// 		target="_blank"
// 		rel="noopener noreferrer"
// 		>
// 		Learn React
// 		</a>
// 		<form action="../../post" method="post"
// 			className="form">
// 		<button type="submit">Connected?</button>
// 		</form>
// 	</header>
// 	</div>
// );
// }

export default App;
