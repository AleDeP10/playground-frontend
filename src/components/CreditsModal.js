import React from "react";
import "./Modal.css";

const CreditsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Credits</h2>
        <ul>
          <li>
            <a href="https://www.freepik.com/search">Icon by Fathema Khanom</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CreditsModal;

