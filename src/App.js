import React, { useState, useEffect } from "react";
import { useLogoutStore } from "./store/index.js";

import Login from "./components/Login.js";
import TodoList from "./components/TodoList.js";
import CreditsModal from "./components/CreditsModal.js";
import TheTeamModal from "./components/TheTeamModal.js";
import Logout from "./components/Logout.js";

import "./App.css";
import logo from "./logo.svg";
import MyComponent from "./components/MyComponent.js";

function App() {
  const [displayCredits, setDisplayCredits] = useState(false);
  const [displayTheTeam, setDisplayTheTeam] = useState(false);
  const [user, setUser] = useState(null); // Imposta l'utente iniziale a null
  const [currentView, setCurrentView] = useState("home");
  const isLoggedOut = useLogoutStore((state) => state.isLoggedOut);

  useEffect(() => {
    if (isLoggedOut) {
      setUser(null); // Imposta l'utente a null in caso di logout
      setCurrentView("logout");
    }
  }, [isLoggedOut]);

  const logout = () => {
    setUser(null);
    setCurrentView("todo");
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="Toolbar">
          <div>
            <img src={logo} className="App-logo" alt="logo" />
            <nav className="Menu">
              <button className="Menu-button">Features</button>
              <div className="Menu-content">
                <button className="Menu-Item" onClick={() => setCurrentView("home")}>Home Endpoints</button>
                <button className="Menu-Item" onClick={() => setCurrentView("todo")}>Todo List</button>
              </div>
            </nav>
            <nav className="Menu">
              <button className="Menu-button">Resources</button>
              <div className="Menu-content">
                <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">Learn React</a>
                <a href="https://www.freepik.com/" target="_blank" rel="noopener noreferrer">Freepik</a>
                <a href="https://copilot.microsoft.com" target="_blank" rel="noopener noreferrer">Copilot</a>
              </div>
            </nav>
            <nav className="Menu">
              <button className="Menu-button">About</button>
              <div className="Menu-content">
                <button className="Menu-Item" onClick={() => setDisplayCredits(true)}>Credits</button>
                <button className="Menu-Item" onClick={() => setDisplayTheTeam(true)}>The Team</button>
              </div>
            </nav>
          </div>
          {user ? (
            <button className="Login-button" onClick={() => logout()}>Logout</button>
          ) : (
            <button className="Login-button" onClick={() => setCurrentView("todo")}>Login</button>
          )}
        </div>
      </header>
      <div className="App-body">
        {currentView === "home" && <MyComponent />}
        {currentView === "todo" && (user ? <TodoList /> : <Login setUser={setUser} />)}
        {currentView === "logout" && <Logout setCurrentView={setCurrentView} />}
      </div>
      <CreditsModal isOpen={displayCredits} onClose={() => setDisplayCredits(false)} />
      <TheTeamModal isOpen={displayTheTeam} onClose={() => setDisplayTheTeam(false)} />
    </div>
  );
}

export default App;
