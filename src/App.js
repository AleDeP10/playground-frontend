import React from "react";

import TodoList from "./components/TodoList.js";

import "./App.css";
// Assicurati che il logo sia importato correttamente
import logo from "./logo.svg";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="Toolbar">
          <div>
            <img src={logo} className="App-logo" alt="logo" />
            <nav className="Menu">
              <button className="Menu-button">Resources</button>
              <div className="Menu-content">
                <a
                  href="https://reactjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn React
                </a>
                <a
                  href="https://copilot.microsoft.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Copilot
                </a>
              </div>
            </nav>
          </div>
          <button className="Login-button">Login</button>
        </div>
      </header>
      <div className="App-body">
        <TodoList />
      </div>
    </div>
  );
}

export default App;
