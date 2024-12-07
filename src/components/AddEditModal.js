import React from "react";
import "./Modal.css";

const AddEditModal = ({ isOpen, onClose, task }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>
          {task ? 'Edit Task' : 'New Task'}
        </h2>
      </div>
    </div>
  );
};

export default AddEditModal;
