import React, { useEffect, useState } from "react";
import "./Modal.css";

const FiltersModal = ({ isOpen, onClose, filters, setFilters }) => {
  const [showTodo, setShowTodo] = useState(filters?.showTodo || true);
  const [showInProgress, setShowInProgress] = useState(
    filters?.showInProgress || true
  );
  const [showDone, setShowDone] = useState(filters?.showDone || true);
  const [taskLike, setTaskLike] = useState(filters?.taskLike || "");

  const apply = () => {
    setFilters({ showTodo, showInProgress, showDone, taskLike });
    onClose();
  };

  useEffect(() => {
    setShowTodo(filters?.showTodo || true);
    setShowInProgress(filters?.showInProgress || true);
    setShowDone(filters?.showDone || false);
    setTaskLike(filters?.taskLike || "");
    console.log('FiltersModal', {filters})
  }, [filters]);

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

export default FiltersModal;
