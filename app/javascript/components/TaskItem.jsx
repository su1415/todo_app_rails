import React from "react";

function TaskItem({
  task,
  isEditing,
  editTitle,
  editDueDate,
  onEditChange,
  onToggleComplete,
  onSave,
  onCancel,
  onEdit,
  onDelete
}) {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div className="d-flex">
        <input
          type="checkbox"
          className="me-2 custom-checkbox"
          checked={ task.completed }
          onChange={ () => onToggleComplete(task) }
          disabled={ isEditing }
        />
      </div>

      <div className="d-flex align-items-center flex-grow-1">
        { isEditing ? (
          <>
            <input
              type="text"
              className="form-control me-2 flex-grow-1"
              value={ editTitle }
              onChange={ (e) => onEditChange(e.target.value, editDueDate) }
            />
          </>
        ) : (
          <span>{ task.title }</span>
        ) }
      </div>

      <div className="d-flex">
        <input
          type="date"
          className="form-control due-date"
          value={ isEditing ? editDueDate : task.due_date }
          onChange={ (e) => onEditChange(editTitle, e.target.value) }
          disabled={ !isEditing }
        />
      </div>

      <div className="d-flex align-items-center">
        { isEditing ? (
          <>
            <button
              className="btn btn-success btn-sm me-2 fixed-width"
              onClick={ onSave }>
              Save
            </button>
            <button
              className="btn btn-secondary btn-sm fixed-width"
              onClick={ onCancel }>
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              className="btn btn-warning btn-sm me-2 fixed-width"
              onClick={ () => onEdit(task)} >
              Edit
            </button>
            <button
              className="btn btn-danger btn-sm fixed-width"
              onClick={ () => onDelete(task.id) }>
              Delete
            </button>
          </>
        ) }
      </div>
    </li>
  );
}

export default TaskItem;
