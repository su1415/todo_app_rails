import React from "react";
import ReactDOM from "react-dom/client";
import TaskList from "./components/TaskList.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

document.addEventListener("DOMContentLoaded", () => {
  const element = document.getElementById("task-list");
  if (element) {
    const root = ReactDOM.createRoot(element);
    root.render(<TaskList />);
  }
});
