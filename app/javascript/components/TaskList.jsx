import React, { useState, useEffect } from "react";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";
import TaskSearchForm from "./TaskSearchForm";
import TaskFilterForm from "./TaskFilterForm";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editTask, setEditTask] = useState(null);
  const [addTaskData, setAddTaskData] = useState({ title: "", dueDate: "" });
  const [editTaskData, setEditTaskData] = useState({ title: "", dueDate: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [completedFilter, setCompletedFilter] = useState("all");
  const csrfToken = document.querySelector("[name=csrf-token]").content;

  useEffect(() => {
    fetch("/tasks")
      .then((response) => response.json())
      .then((data) => {
        setTasks(data.tasks);
        setSearchQuery(data.search_query);
        setCompletedFilter(data.completed_filter);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
        setLoading(false);
      });
  }, []);

  function handleEditTask(task) {
    setEditTask(task);
    setEditTaskData({ title: task.title, dueDate: task.due_date });
  }

  function handleCancelTask() {
    setEditTask(null);
    setEditTaskData({ title: "", dueDate: "" });
  }

  function performRequest(url, method, bodyData, callback) {
    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrfToken,
      },
      body: bodyData ? JSON.stringify(bodyData) : null,
    })
      .then((response) => response.json())
      .then((updatedTasks) => {
        setTasks(updatedTasks);
        if (callback) callback();
      })
      .catch((error) => console.error(`Error performing ${method} request:`, error));
  }

  function handleAddTask(e) {
    e.preventDefault();
    const bodyData = { task: { title: addTaskData.title, due_date: addTaskData.dueDate } };
    performRequest("/tasks", "POST", bodyData, () => setAddTaskData({ title: "", dueDate: "" }));
  }

  function handleUpdateTask(e) {
    e.preventDefault();
    const bodyData = { task: { title: editTaskData.title, due_date: editTaskData.dueDate } };
    performRequest(`/tasks/${editTask.id}`, "PUT", bodyData, () => {
      setEditTask(null);
      setEditTaskData({ title: "", dueDate: "" });
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
    const bodyData = { task: { completed: !task.completed } };
    performRequest(`/tasks/${task.id}`, "PUT", bodyData, null);
  }

  function handleSearchTask() {
    fetch(`/tasks?search=${searchQuery}&completed=${completedFilter}`)
      .then((response) => response.json())
      .then((data) => setTasks(data.tasks))
      .catch((error) => console.error("Error fetching tasks:", error));
  }

  useEffect(() => {
    handleSearchTask();
  }, [completedFilter]);

  return (
    <div className="container mt-5">
      <h1 className="text-center">Task List</h1>

      <TaskForm
        taskData={ addTaskData }
        onTaskDataAdd={ (field, value) => setAddTaskData({ ...addTaskData, [field]: value }) }
        onAddTask={ handleAddTask }
      />

      <TaskFilterForm
        completedFilter={ completedFilter }
        onCompletedFilterSet={ (completedFilter) => setCompletedFilter(completedFilter) }
      />

      <TaskSearchForm
        searchQuery={ searchQuery }
        onTaskSearchSet={ (searchQuery) => setSearchQuery(searchQuery) }
        onSearchTask={ handleSearchTask }
      />

      { loading ? (
        <p>Loading tasks...</p>
      ) : (
        tasks.length === 0 ? (
          <div className="alert alert-info text-center">
            <p>該当するTaskがありません</p>
          </div>
        ) : (
          <ul className="list-group">
            { tasks.map((task) => {
              const isEditing = editTask && editTask.id === task.id;
              return (
                <TaskItem
                  key={ task.id }
                  task={ task }
                  isEditing={ isEditing }
                  editTaskData={ editTaskData }
                  onTaskDataEdit={ (field, value) => setEditTaskData({ ...editTaskData, [field]: value }) }
                  onToggleComplete={ toggleCompleteTask }
                  onSave={ handleUpdateTask }
                  onCancel={ handleCancelTask }
                  onEdit={ handleEditTask }
                  onDelete={ handleDeleteTask }
                />
              );
            })}
          </ul>
        )
      ) }
    </div>
  );
}

export default TaskList;
