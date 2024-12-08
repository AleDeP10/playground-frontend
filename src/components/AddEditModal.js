import React, { useEffect, useState } from "react";
import { crea, aggiorna } from "../api/todo_list";
import "./Modal.css";

const AddEditModal = ({ isOpen, onSave, onClose, taskItem }) => {
  const [task, setTask] = useState(taskItem?.task || "");
  const [status, setStatus] = useState(taskItem?.status || "TODO");

  const save = async () => {
    try {
      if (taskItem) {
        await aggiorna(taskItem.id, task, status); // Aspetta che aggiorna si completi
      } else {
        await crea(task, status); // Aspetta che crea si completi
      }
      await onSave(); // Aspetta che onSave si completi
      setTask('');
      setStatus('TODO');
    } catch (error) {
      console.error('Error during save operation:', error);
    }
  }

  const saveAndClose = () => {
    save();
    onClose();
  }

  useEffect(() => { 
    setTask(taskItem?.task || '');
    setStatus(taskItem?.status || 'TODO');
  }, [taskItem])

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>{taskItem ? "Edit Task" : "New Task"}</h2>
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
          <button onClick={save}>Save and new</button>
        </div>
      </div>
    </div>
  );
};

export default AddEditModal;
