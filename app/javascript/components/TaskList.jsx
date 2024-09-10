import React, { useState, useEffect } from "react";

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("/tasks")
      .then((response) => response.json())
      .then((data) => setTasks(data));
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center">Task List</h1>

      <ul className="list-group">
        { tasks.map((task) => (
          <li key={ task.id } class="list-group-item d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center flex-grow-1">
              <span>{ task.title }</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
