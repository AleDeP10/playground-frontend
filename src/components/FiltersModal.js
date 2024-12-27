import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTodoStore } from "../store/index.js";
import "./Modal.css";

const FiltersModal = ({ isOpen, onClose }) => {
  const setFilters = useTodoStore((state) => state.setFilters);
  const filters = useTodoStore((state) => state.filters);

  const [showTodo, setShowTodo] = useState(filters.showTodo);
  const [showInProgress, setShowInProgress] = useState(filters.showInProgress);
  const [showDone, setShowDone] = useState(filters.showDone);
  const [taskLike, setTaskLike] = useState(filters.taskLike);

  const apply = () => {
    setFilters({ showTodo, showInProgress, showDone, taskLike });
    onClose();
  };

  useEffect(() => {
    setShowTodo(filters.showTodo);
    setShowInProgress(filters.showInProgress);
    setShowDone(filters.showDone);
    setTaskLike(filters.taskLike);
    console.log("FiltersModal", { filters });
  }, [filters, isOpen]); // Aggiungi `isOpen` come dipendenza

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Apply Filters</h2>
        <div>
          <div className="input-container">
            <span className="task-label">Task</span>
            <input
              type="text"
              value={taskLike}
              onChange={(e) => setTaskLike(e.target.value)}
            />
          </div>
          <div className="checkbox-group">
            <div className="checkbox-container">
              <input
                type="checkbox"
                id="showTodo"
                checked={showTodo}
                onChange={(e) => setShowTodo(e.target.checked)}
              />
              <label htmlFor="showTodo">Show Todo</label>
            </div>
            <div className="checkbox-container">
              <input
                type="checkbox"
                id="showInProgress"
                checked={showInProgress}
                onChange={(e) => setShowInProgress(e.target.checked)}
              />
              <label htmlFor="showInProgress">Show In Progress</label>
            </div>
            <div className="checkbox-container">
              <input
                type="checkbox"
                id="showDone"
                checked={showDone}
                onChange={(e) => setShowDone(e.target.checked)}
              />
              <label htmlFor="showDone">Show Done</label>
            </div>
          </div>
        </div>
        <div className="buttons">
          <button onClick={apply}>Apply</button>
        </div>
      </div>
    </div>
  );
};

// Definisci i tipi delle proprietà con propTypes
FiltersModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default FiltersModal;
