import React, { useEffect, useState, useCallback } from "react";
import useApiClientInterceptors from "../useApiClientInterceptors.js";
import { useTodoStore } from "../store/index.js";
import { ricerca, aggiorna, cancella } from "../api/todo_list.js";
import AddEditModal from "./AddEditModal.js";
import FiltersModal from "./FiltersModal.js";
import AddImg from "../assets/add_9055025.png";
import ArrowImg from "../assets/right-arrow_5690084.png";
import DeleteImg from "../assets/delete_5801831.png";
import EditImg from "../assets/circle_14025219.png";
import FilterImg from "../assets/filter_6460397.png";
import RemoveFilterImg from "../assets/failed_6569363.png";

import "./TodoList.css";

const TodoList = () => {
  const apiClient = useApiClientInterceptors();

  const setTaskItems = useTodoStore((state) => state.setTasks);
  const setFilters = useTodoStore((state) => state.setFilters);
  const filters = useTodoStore((state) => state.filters);
  const getFilteredTasks = useTodoStore((state) => state.getFilteredTasks);

  const [updated, setUpdated] = useState(true);
  const [displayAddEdit, setDisplayAddEdit] = useState(false);
  const [displayFilters, setDisplayFilters] = useState(false);
  const [taskItem, setTaskItem] = useState(null);

  const search = useCallback(async () => {
    const items = await ricerca(apiClient);
    if (Array.isArray(items)) {
      setTaskItems(items);
    } else {
      console.log("TodoList", { items });
      setTaskItems([]);
    }
  }, [apiClient, setTaskItems]);

  useEffect(() => {
    if (updated) {
      search();
      setUpdated(false);
    }
  }, [search, updated]);

  const closeTaskModal = () => {
    setDisplayAddEdit(false);
    setTaskItem(null);
  };

  const closeFilterModal = () => {
    setDisplayFilters(false);
  };

  const removeFilter = () => {
    setFilters({
      taskLike: "",
      showTodo: true,
      showInProgress: true,
      showDone: false,
    });
  };

  const editTask = (task) => {
    setTaskItem(task);
    setDisplayAddEdit(true);
  };

  const remove = async (id) => {
    await cancella(apiClient, id);
    setUpdated(true);
  };

  const nextStatus = async (task) => {
    switch (task.status) {
      case "TODO":
        task.status = "IN PROGRESS";
        break;
      case "IN PROGRESS":
        task.status = "DONE";
        break;
      default:
        return;
    }
    await aggiorna(apiClient, task.id, task.task, task.status);
    setUpdated(true);
  };

  return (
    <div className="TodoList">
      <h2>TODO LIST</h2>
      <div className="Action-Buttons">
        <button
          className="Imaged-Button"
          title="Add task"
          onClick={() => setDisplayAddEdit(true)}
        >
          <img src={AddImg} alt="add" />
        </button>
        <div className="Filter-Buttons">
          <button
            className="Imaged-Button"
            title="Filters"
            onClick={() => setDisplayFilters(true)}
          >
            <img src={FilterImg} alt="filter" />
          </button>
          <button
            className="Imaged-Button"
            title="Reset to default"
            onClick={removeFilter}
          >
            <img src={RemoveFilterImg} alt="remove filter" />
          </button>
        </div>
      </div>

      <div className="List">
        {getFilteredTasks().map((task) => (
          <div key={task.id} className="List-Item">
            <span className="Task-Description">{task.task}</span>
            <span className="Task-Status">{task.status}</span>
            <span className="Task-Buttons">
              <button
                className="Imaged-Button"
                title="Edit task"
                onClick={() => editTask(task)}
              >
                <img src={EditImg} alt="edit" />
              </button>
              <button
                className="Imaged-Button"
                title="Move to next status"
                onClick={() => nextStatus(task)}
                disabled={task.status === "DONE"}
              >
                <img src={ArrowImg} alt="next" />
              </button>
              <button
                className="Imaged-Button"
                title="Delete task"
                onClick={() => remove(task.id)}
              >
                <img src={DeleteImg} alt="delete" />
              </button>
            </span>
          </div>
        ))}
      </div>
      <AddEditModal
        isOpen={displayAddEdit}
        onClose={closeTaskModal}
        onSave={() => setUpdated(true)}
        taskItem={taskItem}
      />
      <FiltersModal
        isOpen={displayFilters}
        onClose={closeFilterModal}
        filters={filters}
        setFilters={setFilters}
      />
    </div>
  );
};

export default TodoList;
