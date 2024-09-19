import React from "react";

function TaskForm({ taskData, onTaskDataAdd, onAddTask }) {
  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        data-testid="test-input-title"
        placeholder="Add Task"
        value={ taskData.title }
        onChange={ (e) => onTaskDataAdd("title", e.target.value) }
      />
      <input
        type="date"
        className="form-control"
        data-testid="test-input-due-date"
        value={ taskData.dueDate }
        onChange={ (e) => onTaskDataAdd("dueDate", e.target.value) }
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
