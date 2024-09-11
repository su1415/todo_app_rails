import React, { useState, useEffect } from "react";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [addTitle, setAddTitle] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [addDueDate, setAddDueDate] = useState("");
  const [editDueDate, setEditDueDate] = useState("");
  const csrfToken = document.querySelector("[name=csrf-token]").content;

  useEffect(() => {
    fetch("/tasks")
      .then((response) => response.json())
      .then((data) => setTasks(data));
  }, []);

  function handleAddTask(e) {
    e.preventDefault();
    fetch("/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrfToken,
      },
      body: JSON.stringify({ task: { title: addTitle, due_date: addDueDate } }),
    })
      .then((response) => response.json())
      .then((updatedTasks) => {
        setTasks(updatedTasks);
        setAddTitle("");
        setAddDueDate("");
      });
  }

  function handleEditTask(task) {
    setEditTask(task);
    setEditTitle(task.title);
    setEditDueDate(task.due_date);
  }

  function handleCancelTask() {
    setEditTask(null);
    setEditTitle("");
    setEditDueDate("");
  }

  function handleUpdateTask(e) {
    e.preventDefault();
    fetch(`/tasks/${editTask.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrfToken,
      },
      body: JSON.stringify({ task: { title: editTitle, due_date: editDueDate } }),
    })
      .then((response) => response.json())
      .then((updatedTasks) => {
        setTasks(updatedTasks);
        setEditTask(null);
        setEditTitle("");
        setEditDueDate("");
      });
  }

  function handleDeleteTask(taskId) {
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

  function toggleCompleteTask(task) {
    fetch(`/tasks/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrfToken,
      },
      body: JSON.stringify({ task: { completed: !task.completed } }),
    })
      .then((response) => response.json())
      .then((updatedTasks) => {
        setTasks(updatedTasks);
      });
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center">Task List</h1>

      <TaskForm
        addTitle={ addTitle }
        addDueDate={ addDueDate }
        onTitleChange={ setAddTitle }
        onDateChange={ setAddDueDate }
        onAddTask={ handleAddTask }
      />

      <ul className="list-group">
        { tasks.map((task) => {
          const isEditing = editTask && editTask.id === task.id;

          return (
            <TaskItem
              key={ task.id }
              task={ task }
              isEditing={ isEditing }
              editTitle={ editTitle }
              editDueDate={ editDueDate }
              onEditChange={ (newTitle, newDueDate) => {
                setEditTitle(newTitle);
                setEditDueDate(newDueDate);
              } }
              onToggleComplete={ toggleCompleteTask }
              onSave={ handleUpdateTask }
              onCancel={ handleCancelTask }
              onEdit={ handleEditTask }
              onDelete={ handleDeleteTask }
            />
          );
        })}
      </ul>
    </div>
  );
}

export default TaskList;
