import { useState } from "react";

function getInitialTasks() {
  const saved = localStorage.getItem("tasks");
  return saved ? JSON.parse(saved) : [];
}

function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

export function useTasks() {
  const [tasks, setTasks] = useState(getInitialTasks);

  function addTask(title) {
    const updated = [...tasks, { id: Date.now(), title, done: false }];
    setTasks(updated);
    saveTasks(updated);
  }

  return { tasks, addTask };
}
