import { useState } from "react";
import { useTasks } from "../hooks/useTasks";
import { useTheme } from "../hooks/useTheme";

export default function TodoPage({ onLogout }) {
  const { tasks, addTask, toggleTask, editTask } = useTasks();
  const { theme, toggleTheme } = useTheme();
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editInput, setEditInput] = useState("");

  const isDark = theme === "dark";

  const totalTasks = tasks.length;
  const doneTasks = tasks.filter((t) => t.done).length;

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

  function startEdit(task) {
    setEditingId(task.id);
    setEditInput(task.title);
  }

  function handleEdit(e, id) {
    e.preventDefault();
    if (!editInput.trim()) return;
    editTask(id, editInput.trim());
    setEditingId(null);
  }

  return (
    <div className={`flex flex-col flex-1 ${isDark ? "bg-gray-900" : "bg-gray-50"}`}>
      <header className={`px-6 py-4 flex items-center justify-between border-b ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
        <div className="flex items-center gap-3">
          <h1 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
            My Tasks
          </h1>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isDark ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-500"}`}>
            {doneTasks}/{totalTasks} done
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className={`text-sm px-3 py-2 rounded-lg border transition-colors cursor-pointer ${isDark ? "border-gray-600 text-gray-300 hover:bg-gray-700" : "border-gray-200 text-gray-600 hover:bg-gray-100"}`}
          >
            {isDark ? "☀️ Light" : "🌙 Dark"}
          </button>
          <button
            onClick={onLogout}
            className="bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors cursor-pointer"
          >
            Log Out
          </button>
        </div>
      </header>

      <main className="flex flex-col gap-6 w-full max-w-xl mx-auto px-4 py-8">
        <form onSubmit={handleAdd} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => { setInput(e.target.value); setError(""); }}
            placeholder="Add a new task..."
            className={`flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-100 focus:border-violet-500 ${isDark ? "bg-gray-800 border-gray-600 text-white placeholder-gray-500" : "bg-white border-gray-300 text-gray-800"}`}
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
          <p className={`text-sm text-center mt-6 ${isDark ? "text-gray-500" : "text-gray-400"}`}>
            No tasks yet. Add one above!
          </p>
        ) : (
          <ul className="flex flex-col gap-2">
            {tasks.map((task) => (
              <li
                key={task.id}
                className={`flex items-center gap-3 border rounded-lg px-4 py-3 ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
              >
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => toggleTask(task.id)}
                  className="w-4 h-4 accent-violet-600 cursor-pointer shrink-0"
                />

                {editingId === task.id ? (
                  <form onSubmit={(e) => handleEdit(e, task.id)} className="flex flex-1 gap-2">
                    <input
                      autoFocus
                      value={editInput}
                      onChange={(e) => setEditInput(e.target.value)}
                      className={`flex-1 border rounded px-2 py-1 text-sm focus:outline-none focus:border-violet-500 ${isDark ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-800"}`}
                    />
                    <button type="submit" className="text-xs text-violet-600 font-medium cursor-pointer">Save</button>
                    <button type="button" onClick={() => setEditingId(null)} className={`text-xs cursor-pointer ${isDark ? "text-gray-400" : "text-gray-400"}`}>Cancel</button>
                  </form>
                ) : (
                  <>
                    <span className={`flex-1 text-sm ${task.done ? "line-through text-gray-400" : isDark ? "text-gray-100" : "text-gray-800"}`}>
                      {task.title}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${task.done ? "bg-green-100 text-green-600" : isDark ? "bg-gray-700 text-gray-400" : "bg-gray-100 text-gray-400"}`}>
                      {task.done ? "done" : "pending"}
                    </span>
                    <button
                      onClick={() => startEdit(task)}
                      className={`text-xs cursor-pointer ${isDark ? "text-gray-400 hover:text-violet-400" : "text-gray-400 hover:text-violet-600"}`}
                    >
                      Edit
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
