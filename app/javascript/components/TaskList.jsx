import React, { useState, useEffect } from "react";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [addTitle, setAddTitle] = useState("");

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
              <span>{ task.title }</span>
            </div>
            <button
              className="btn btn-dangerbtn btn-danger btn-sm fixed-width"
              onClick={ () => handleDeleteTask(task.id) }>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
