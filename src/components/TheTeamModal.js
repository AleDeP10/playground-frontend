import React from "react";
import "./Modal.css";

const TheTeamModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>The Team</h2>
        <ul>
          <li>
            <a href="https://github.com/AleDeP10">Alessandro De Prato</a>
          </li>
          <li>
            <a href="https://github.com/Belmani">Gabriela Belmani</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TheTeamModal;
