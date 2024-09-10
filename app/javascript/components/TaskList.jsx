import React, { useState, useEffect } from "react";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [addTitle, setAddTitle] = useState("");
  const [editTitle, setEditTitle] = useState("");

  useEffect(() => {
    fetch("/tasks")
      .then((response) => response.json())
      .then((data) => setTasks(data));
  }, []);

  function handleAddTask(e) {
    e.preventDefault();
    const csrfToken = document.querySelector("[name=csrf-token]").content;

    fetch("/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrfToken,
      },
      body: JSON.stringify({ task: { title: addTitle } }),
    })
      .then((response) => response.json())
      .then((newTask) => {
        setTasks([...tasks, newTask]);
        setAddTitle("");
      });
  }

  function handleEditTask(task) {
    setEditTask(task);
    setEditTitle(task.title);
  }

  function handleCancelTask() {
    setEditTask(null);
    setEditTitle("");
  }

  function handleUpdateTask(e) {
    e.preventDefault();
    const csrfToken = document.querySelector("[name=csrf-token]").content;

    fetch(`/tasks/${editTask.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrfToken,
      },
      body: JSON.stringify({ task: { title: editTitle } }),
    })
      .then((response) => response.json())
      .then((updatedTask) => {
        setTasks(
          tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
        );
        setEditTask(null);
        setEditTitle("");
      });
  }

  function handleDeleteTask(taskId) {
    const csrfToken = document.querySelector("[name=csrf-token]").content;

    fetch(`/tasks/${taskId}`, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": csrfToken,
      },
    })
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== taskId));
      })
      .catch((error) => console.error("Error deleting task:", error));
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center">Task List</h1>

      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Add Task"
          value={ addTitle }
          onChange={ (e) => setAddTitle(e.target.value) }
        />
        <button
          className="btn btn-primary"
          onClick={ handleAddTask }>
          Add
        </button>
      </div>

      <ul className="list-group">
        { tasks.map((task) => (
          <li key={ task.id } className="list-group-item d-flex justify-content-between align-items-center">

            <div className="d-flex align-items-center flex-grow-1">
              { editTask && editTask.id === task.id ? (
                  <>
                    <input
                      type="text"
                      className="form-control"
                      value={ editTitle }
                      onChange={ (e) => setEditTitle(e.target.value) }
                    />
                  </>
                ) : (
                  <>
                    <div className="d-flex align-items-center flex-grow-1">
                      <span>{ task.title }</span>
                    </div>
                  </>
                )
              }
            </div>

            <div className="d-flex align-items-center">
              { editTask && editTask.id === task.id ? (
                  <>
                    <button
                      className="btn btn-success btn-sm me-2 fixed-width"
                      onClick={ handleUpdateTask }>
                      Save
                    </button>
                    <button
                      className="btn btn-secondary btn-sm fixed-width"
                      onClick={ handleCancelTask }>
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-warning btn-sm me-2 fixed-width"
                      onClick={ () => handleEditTask(task) }>
                      Edit
                    </button>
                    <button
                      className="btn btn-dangerbtn btn-danger btn-sm fixed-width"
                      onClick={ () => handleDeleteTask(task.id) }>
                      Delete
                    </button>
                  </>
                )
              }
            </div>

          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
