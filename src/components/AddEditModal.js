import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useApiClientInterceptors from "../useApiClientInterceptors.js";
import { create, update } from "../api/todoList.js";
import "./Modal.css";

const AddEditModal = ({ isOpen, onClose, onSave, taskItem }) => {
  const apiClient = useApiClientInterceptors();

  const [currentItem, setCurrentItem] = useState(taskItem)
  const [task, setTask] = useState(taskItem?.task || "");
  const [status, setStatus] = useState(taskItem?.status || "TODO");
  const [errorMessage, setErrorMessage] = useState("");

  const save = async () => {
    try {
      let error;
      if (currentItem?.id) {
        error = await update(apiClient, taskItem.id, task, status);
      } else {
        error = await create(apiClient, task, status);
      }
      const display = displayErrorMessage(error);
      if (!display) {
        onSave(); 
        setTask("");
        setStatus("TODO");
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error during save operation:", error);
      return false;
    }
  };

  const saveAndNew = async () => {
    if (await save()) {
      setCurrentItem({
        task: "",
        status: "TODO"
      });
    }
  };

  const saveAndClose = async () => {
    if (await save()) {
      onClose();
    }
  };

  const displayErrorMessage = (jsonData) => {
    if (jsonData?.error) {
      setErrorMessage(jsonData.error);
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      return true;
    }

    setErrorMessage("");
    return false;
  }

  useEffect(() => {
    setTask(taskItem?.task || "");
    setStatus(taskItem?.status || "TODO");
    setCurrentItem(taskItem);
  }, [taskItem]);

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>{currentItem?.id ? "Edit Task" : "New Task"}</h2>
        {errorMessage && <div className="Error">{errorMessage}</div>}
        <div>
          <div className="input-container">
            <span className="task-label">Task</span>
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
          </div>
          <div className="input-container">
            <span className="task-label">Status</span>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="TODO">TODO</option>
              <option value="IN PROGRESS">IN PROGRESS</option>
              <option value="DONE">DONE</option>
            </select>
          </div>
        </div>
        <div className="buttons">
          <button onClick={saveAndClose}>Save</button>
          <button onClick={saveAndNew}>Save and new</button>
        </div>
      </div>
    </div>
  );
};

AddEditModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  taskItem: PropTypes.shape({
    id: PropTypes.number,
    task: PropTypes.string,
    status: PropTypes.string,
  }),
};

export default AddEditModal;
