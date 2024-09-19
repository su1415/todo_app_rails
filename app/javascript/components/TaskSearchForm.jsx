import React from "react";

function TaskSearchForm({ searchQuery, onTaskSearchSet, onSearchTask }) {
  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        data-testid="test-input-search"
        placeholder="Search tasks"
        value={ searchQuery }
        onChange={ (e) => onTaskSearchSet(e.target.value) }
      />
      <button
        className="btn btn-outline-primary"
        onClick={ onSearchTask }>
        Search
      </button>
    </div>
  );
}

export default TaskSearchForm;
