import React from "react";

function TaskForm({ addTitle, addDueDate, onTitleChange, onDateChange, onAddTask }) {
  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Add Task"
        value={ addTitle }
        onChange={ (e) => onTitleChange(e.target.value) }
      />
      <input
        type="date"
        className="form-control"
        value={ addDueDate }
        onChange={ (e) => onDateChange(e.target.value) }
      />
      <button
        className="btn btn-primary"
        onClick={ onAddTask }>
        Add
      </button>
    </div>
  );
}

export default TaskForm;
