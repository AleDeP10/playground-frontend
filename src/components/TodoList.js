import { useEffect, useState, useCallback } from "react";

import AddImg from "../assets/add_9055025.png";
import ArrowImg from "../assets/right-arrow_5690084.png";
import DeleteImg from "../assets/delete_5801831.png";
import EditImg from "../assets/circle_14025219.png";
import FilterImg from "../assets/filter_6460397.png";
import RemoveFilterImg from "../assets/failed_6569363.png";

import { ricerca, aggiorna, cancella } from "../api/todo_list";

import AddEditModal from "./AddEditModal";
import FiltersModal from "./FiltersModal";

import "./TodoList.css";

const TodoList = () => {
  const [displayAddEdit, setDisplayAddEdit] = useState(false);
  const [displayFilters, setDisplayFilters] = useState(false);
  const [taskItems, setTodoItems] = useState([]);
  const [taskItem, setTaskItem] = useState(null);
  const [filters, setFilters] = useState({});

  const search = useCallback(async () => {
    const items = await ricerca(filters);
    if (Array.isArray(items)) {
      setTodoItems(items);
    } else {
      console.log("TodoList", { items });
      setTodoItems([]);
    }
  }, [filters]);

  const closeTaskModal = async () => {
    setDisplayAddEdit(false);
    setTaskItem(null);
    await search();
  };

  const closeFilterModal = async () => {
    setDisplayFilters(false);
    await search();
  };

  const removeFilter = async () => {
    setFilters({
      taskLike: "",
      showTodo: true,
      showInProgress: true,
      showDone: false,
    });
    await search();
  };

  const editTask = (task) => {
    setTaskItem(task);
    setDisplayAddEdit(true);
  };

  const remove = async (id) => {
    await cancella(id);
    await search();
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
    await aggiorna(task.id, task.task, task.status);
    await search();
  };

  useEffect(() => {
    search();
  }, [search]);

  return (
    <div className="TodoList">
      <h2>TODO LIST</h2>
      <div className="Action-Buttons">
        <button
          className="Imaged-Button"
          onClick={() => setDisplayAddEdit(true)}
        >
          <img src={AddImg} alt="add" />
        </button>
        <div className="Filter-Buttons">
          <button
            className="Imaged-Button"
            onClick={() => setDisplayFilters(true)}
          >
            <img src={FilterImg} alt="filter" />
          </button>
          <button className="Imaged-Button" onClick={() => removeFilter()}>
            <img src={RemoveFilterImg} alt="show all" />
          </button>
        </div>
      </div>

      <div className="List">
        {taskItems.map((task) => (
          <div key={task.id} className="List-Item">
            <span className="Task-Description">{task.task}</span>
            <span className="Task-Status">{task.status}</span>
            <span className="Task-Buttons">
              <button className="Imaged-Button" onClick={() => editTask(task)}>
                <img src={EditImg} alt="edit" />
              </button>
              <button
                className="Imaged-Button"
                onClick={() => nextStatus(task)}
                disabled={task.status === "DONE"}
              >
                <img src={ArrowImg} alt="next" />
              </button>
              <button className="Imaged-Button" onClick={() => remove(task.id)}>
                <img src={DeleteImg} alt="delete" />
              </button>
            </span>
          </div>
        ))}
      </div>
      <AddEditModal
        isOpen={displayAddEdit}
        onClose={closeTaskModal}
        onSave={search}
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
