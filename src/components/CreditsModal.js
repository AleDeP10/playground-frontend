import React from "react";
import AddImg from "../assets/add_9055025.png";
import ArrowImg from "../assets/right-arrow_5690084.png";
import DeleteImg from "../assets/delete_5801831.png";
import EditImg from "../assets/circle_14025219.png";
import FilterImg from "../assets/filter_6460397.png";
import RemoveFilterImg from "../assets/failed_6569363.png";
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
          <li>
            <img src={DeleteImg} alt="next" />
            <a href="https://www.freepik.com/search">Icon by Iconpro86</a>
          </li>
          <li>
            <img src={EditImg} alt="next" />
            <a href="https://www.freepik.com/search">Icon by hqrloveq</a>
          </li>
          <li>
            <img src={FilterImg} alt="filter" />
            <a href="https://www.freepik.com/search#uuid=3d8b2e4a-d8b0-4362-9b9a-dfb8e2f9e855">Icon by Creatype</a>
          </li>
          <li>
            <img src={RemoveFilterImg} alt="show all" />
            <a href="https://www.freepik.com/search#uuid=f3221fc7-1efe-4618-a3dc-0090871c757b">Icon by Rizki Ahmad Fauzi</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CreditsModal;

