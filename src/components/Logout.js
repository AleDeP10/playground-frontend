import React from "react";
import { useLogoutStore } from "../store/index.js";

const Logout = ({ setCurrentView }) => {
  const setLogout = useLogoutStore((state) => state.setLogout);

  return (
    <div>
      <h1>You have been logged out</h1>
      <p>
        Please <a href="#" onClick={() => { setLogout(false); setCurrentView("todo"); }}>login</a> again to continue.
      </p>
      <p>
        Or go back to <a href="#" onClick={() => { setLogout(false); setCurrentView("home"); }}>home</a>.
      </p>
    </div>
  );
};

export default Logout;
