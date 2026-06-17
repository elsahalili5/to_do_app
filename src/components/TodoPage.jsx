import { useState } from "react";
import { useTasks } from "../hooks/useTasks";

export default function TodoPage({ onLogout }) {
  const { tasks, addTask } = useTasks();
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  function handleAdd(e) {
    e.preventDefault();
    if (!input.trim()) {
      setError("Task cannot be empty.");
      return;
    }
    addTask(input.trim());
    setInput("");
    setError("");
  }

  return (
    <div className="flex flex-col flex-1 bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-900">My Tasks</h1>
        <button
          onClick={onLogout}
          className="bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors cursor-pointer"
        >
          Log Out
        </button>
      </header>

      <main className="flex flex-col gap-6 w-full max-w-xl mx-auto px-4 py-8">
        <form onSubmit={handleAdd} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setError("");
            }}
            placeholder="Add a new task..."
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
          />
          <button
            type="submit"
            className="bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors cursor-pointer"
          >
            Add
          </button>
        </form>

        {error && <p className="text-xs text-red-500 -mt-4">{error}</p>}

        {tasks.length === 0 ? (
          <p className="text-sm text-gray-400 text-center mt-6">No tasks yet. Add one above!</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800"
              >
                {task.title}
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
