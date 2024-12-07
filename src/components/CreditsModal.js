import React from "react";
import AddImg from "../assets/add_9055025.png";
import ArrowImg from "../assets/right-arrow_5690084.png";
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
            <img src={AddImg} alt="new" />
            <a href="https://www.freepik.com/search">Icon by Fathema Khanom</a>
          </li>
          <li>
            <img src={ArrowImg} alt="next" />
            <a href="https://www.freepik.com/search">Icon by IYAHICON</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CreditsModal;

