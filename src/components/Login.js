import React, { useState } from "react";
import useApiClientInterceptors from "../useApiClientInterceptors.js";
import TodoListImg from "../assets/clipboard-icon.jpg";
import "./Login.css";

const login = ({ setUser }) => {
  const apiClient = useApiClientInterceptors();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const sendCredentials = async () => {
    try {
      const response = await apiClient.post(
        `${process.env.REACT_APP_SERVER_URL}/login`,
        { username, password }
      );
  
      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
        setUser(response.data.username);
      }
    } catch (error) {
      if (error.response) {
        // La richiesta è stata effettuata e il server ha risposto con un codice di stato che non rientra nel range 2xx
        switch (error.response.status) {
          case 401:
            setMessage("Invalid username or password");
            break;
          case 500:
          default:
            setMessage("Internal Server Error");
        }
      } else if (error.request) {
        // La richiesta è stata effettuata ma non è stata ricevuta nessuna risposta
        setMessage("No response received from server");
      } else {
        // Qualcosa è andato storto nella configurazione della richiesta
        setMessage("Error in setting up the request");
      }
    }
  };  

  return (
    <div className="login">
      <div>
        <img src={TodoListImg} alt="todo list" />
      </div>
      <div>
        <h2>TODO LIST</h2>
        <div className="input-container">
          <span className="input-label">Username</span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-container">
          <span className="input-label">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {message ? (
          <div className="errors">
            <span>{message}</span>
          </div>
        ) : (
          <></>
        )}
        <div className="buttons">
          <button onClick={sendCredentials}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default login;
