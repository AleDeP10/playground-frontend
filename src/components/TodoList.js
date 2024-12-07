import { useState } from "react";
import AddEditModal from "./AddEditModal";
import AddImg from "../assets/add_9055025.png";
import "./TodoList.css";

const TodoList = () => {
  const [displayAddEdit, setDisplayAddEdit] = useState(false);
  return (
    <div className="TodoList">
      <h2>
        TODO LIST
        <button className="Imaged-Button" onClick={() => setDisplayAddEdit(true)}>
          <img src={AddImg} alt="new" />
        </button>
      </h2>
      <AddEditModal
        isOpen={displayAddEdit}
        onClose={() => setDisplayAddEdit(false)}
      />
    </div>
  );
};

export default TodoList;
