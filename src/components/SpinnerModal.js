import React from "react";
import PropTypes from "prop-types";
import SpinnerImg from "../assets/blue_14025120.png";
import "./Modal.css";

const SpinnerModal = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Loading...</h2>
        <img className="App-logo spinner" src={SpinnerImg} alt="spinner" />
      </div>
    </div>
  );
};

SpinnerModal.propTypes = {
  isOpen: PropTypes.bool.isRequired
};

export default SpinnerModal;
