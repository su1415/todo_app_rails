import React from "react";

function TaskFilterForm({ completedFilter, onCompletedFilterSet }) {
  return (
    <div className="btn-group mb-3">
      <input
        type="radio"
        className="btn-check"
        id="all"
        value="all"
        checked={ completedFilter === "all" }
        onChange={ (e) => onCompletedFilterSet(e.target.value) }
      />
      <label
        className={ `btn btn-outline-secondary ${completedFilter === "all" ? "active" : ""}` }
        htmlFor="all">
        All
      </label>

      <input
        type="radio"
        className="btn-check"
        id="completed"
        value="completed"
        checked={completedFilter === "completed"}
        onChange={ (e) => onCompletedFilterSet(e.target.value) }
      />
      <label
        className={ `btn btn-outline-secondary ${completedFilter === "completed" ? "active" : ""}` }
        htmlFor="completed">
        Completed
      </label>

      <input
        type="radio"
        className="btn-check"
        id="incompleted"
        value="incompleted"
        checked={completedFilter === "incompleted"}
        onChange={ (e) => onCompletedFilterSet(e.target.value) }
      />
      <label
        className={ `btn btn-outline-secondary ${completedFilter === "incompleted" ? "active" : ""}` }
        htmlFor="incompleted">
        Incompleted
      </label>
    </div>
  );
}

export default TaskFilterForm;
