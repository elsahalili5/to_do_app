import { useState } from "react";
import { useTasks } from "../hooks/useTasks";
import { useTheme } from "../hooks/useTheme";
import ConfirmModal from "./ConfirmModal";

const PRIORITY_STYLES = {
  high:   "bg-red-100 text-red-600",
  medium: "bg-yellow-100 text-yellow-600",
  low:    "bg-blue-100 text-blue-600",
};

const CATEGORY_STYLES = {
  work:     "bg-violet-100 text-violet-600",
  school:   "bg-orange-100 text-orange-600",
  personal: "bg-teal-100 text-teal-600",
};

const IconEdit = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);

const IconDelete = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
    <path d="M10 11v6M14 11v6"/>
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
  </svg>
);

export default function TodoPage({ onLogout }) {
  const { tasks, addTask, toggleTask, editTask, deleteTask } = useTasks();
  const { theme, toggleTheme } = useTheme();
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState("medium");
  const [category, setCategory] = useState("personal");
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editInput, setEditInput] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  const isDark = theme === "dark";
  const doneTasks = tasks.filter((t) => t.done).length;

  const filteredTasks = tasks.filter((t) => {
    if (search && !t.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterStatus === "done" && !t.done) return false;
    if (filterStatus === "pending" && t.done) return false;
    if (filterPriority !== "all" && t.priority !== filterPriority) return false;
    if (filterCategory !== "all" && t.category !== filterCategory) return false;
    return true;
  });

  function handleAdd(e) {
    e.preventDefault();
    if (!input.trim()) { setError("Task cannot be empty."); return; }
    addTask(input.trim(), priority, category);
    setInput("");
    setPriority("medium");
    setCategory("personal");
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

  const base = isDark
    ? { bg: "bg-gray-900", card: "bg-gray-800 border-gray-700", header: "bg-gray-800 border-gray-700", input: "bg-gray-800 border-gray-600 text-white placeholder-gray-500", select: "bg-gray-800 border-gray-600 text-white", text: "text-white", sub: "text-gray-400", badge: "bg-gray-700 text-gray-300" }
    : { bg: "bg-gray-50", card: "bg-white border-gray-200", header: "bg-white border-gray-200", input: "bg-white border-gray-300 text-gray-800", select: "bg-white border-gray-300 text-gray-700", text: "text-gray-900", sub: "text-gray-400", badge: "bg-gray-100 text-gray-500" };

  return (
    <div className={`flex flex-col flex-1 ${base.bg}`}>

      {/* Header */}
      <header className={`px-6 py-4 flex items-center justify-between border-b ${base.header}`}>
        <h1 className={`text-lg font-semibold ${base.text}`}>My Tasks</h1>
        <div className="flex items-center gap-2">
          <button onClick={toggleTheme} className={`text-sm px-3 py-2 rounded-lg border transition-colors cursor-pointer ${isDark ? "border-gray-600 text-gray-300 hover:bg-gray-700" : "border-gray-200 text-gray-600 hover:bg-gray-100"}`}>
            {isDark ? "☀️ Light" : "🌙 Dark"}
          </button>
          <button onClick={onLogout} className="bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors cursor-pointer">
            Log Out
          </button>
        </div>
      </header>

      {deletingId && (
        <ConfirmModal
          message="Are you sure you want to delete this task?"
          isDark={isDark}
          onConfirm={() => { deleteTask(deletingId); setDeletingId(null); }}
          onCancel={() => setDeletingId(null)}
        />
      )}

      {/* Stats counters */}
      <div className="w-full max-w-2xl mx-auto px-4 pt-6 grid grid-cols-2 gap-4">
        <div className={`rounded-xl border px-6 py-4 flex flex-col items-center gap-1 ${base.card}`}>
          <span className={`text-4xl font-bold text-violet-600`}>{tasks.length}</span>
          <span className={`text-sm font-medium ${base.sub}`}>Total Tasks</span>
        </div>
        <div className={`rounded-xl border px-6 py-4 flex flex-col items-center gap-1 ${base.card}`}>
          <span className={`text-4xl font-bold text-green-500`}>{doneTasks}</span>
          <span className={`text-sm font-medium ${base.sub}`}>Completed</span>
        </div>
      </div>

      <main className="flex flex-col gap-4 w-full max-w-2xl mx-auto px-4 py-6">

        {/* Add Task Form */}
        <form onSubmit={handleAdd} className="flex flex-col gap-2">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => { setInput(e.target.value); setError(""); }}
              placeholder="Add a new task..."
              className={`flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-100 focus:border-violet-500 ${base.input}`}
            />
            <button type="submit" className="bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors cursor-pointer">
              Add
            </button>
          </div>
          <div className="flex gap-2">
            <select value={priority} onChange={(e) => setPriority(e.target.value)} className={`flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-500 cursor-pointer ${base.select}`}>
              <option value="low">🔵 Low</option>
              <option value="medium">🟡 Medium</option>
              <option value="high">🔴 High</option>
            </select>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className={`flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-500 cursor-pointer ${base.select}`}>
              <option value="work">💼 Work</option>
              <option value="school">📚 School</option>
              <option value="personal">🙂 Personal</option>
            </select>
          </div>
          {error && <p className="text-xs text-red-500">{error}</p>}
        </form>

        {/* Search & Filters */}
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks..."
            className={`border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-100 focus:border-violet-500 ${base.input}`}
          />
          <div className="flex gap-2">
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className={`flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-500 cursor-pointer ${base.select}`}>
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="done">Done</option>
            </select>
            <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)} className={`flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-500 cursor-pointer ${base.select}`}>
              <option value="all">All Priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className={`flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-500 cursor-pointer ${base.select}`}>
              <option value="all">All Categories</option>
              <option value="work">Work</option>
              <option value="school">School</option>
              <option value="personal">Personal</option>
            </select>
          </div>
        </div>

        {/* Task List */}
        {filteredTasks.length === 0 ? (
          <p className={`text-sm text-center mt-6 ${base.sub}`}>
            {tasks.length === 0 ? "No tasks yet. Add one above!" : "No tasks match your filters."}
          </p>
        ) : (
          <ul className="flex flex-col gap-2">
            {filteredTasks.map((task) => (
              <li key={task.id} className={`flex items-center gap-3 border rounded-lg px-4 py-3 ${base.card}`}>
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => toggleTask(task.id)}
                  className="w-4 h-4 accent-violet-600 cursor-pointer shrink-0"
                />

                {editingId === task.id ? (
                  <form onSubmit={(e) => handleEdit(e, task.id)} className="flex flex-1 gap-2 items-center">
                    <input
                      autoFocus
                      value={editInput}
                      onChange={(e) => setEditInput(e.target.value)}
                      className={`flex-1 border rounded px-2 py-1 text-sm focus:outline-none focus:border-violet-500 ${isDark ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-800"}`}
                    />
                    <button type="submit" className="text-xs text-violet-600 font-medium cursor-pointer">Save</button>
                    <button type="button" onClick={() => setEditingId(null)} className={`text-xs cursor-pointer ${base.sub}`}>Cancel</button>
                  </form>
                ) : (
                  <>
                    <span className={`flex-1 text-sm ${task.done ? "line-through text-gray-400" : base.text}`}>
                      {task.title}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${CATEGORY_STYLES[task.category] || CATEGORY_STYLES.personal}`}>
                        {task.category || "personal"}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${PRIORITY_STYLES[task.priority] || PRIORITY_STYLES.medium}`}>
                        {task.priority || "medium"}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${task.done ? "bg-green-100 text-green-600" : base.badge}`}>
                        {task.done ? "done" : "pending"}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button onClick={() => startEdit(task)} title="Edit" className={`p-1 rounded cursor-pointer transition-colors ${isDark ? "text-gray-400 hover:text-violet-400 hover:bg-gray-700" : "text-gray-400 hover:text-violet-600 hover:bg-gray-50"}`}>
                        <IconEdit />
                      </button>
                      <button onClick={() => setDeletingId(task.id)} title="Delete" className={`p-1 rounded cursor-pointer transition-colors ${isDark ? "text-gray-400 hover:text-red-400 hover:bg-gray-700" : "text-gray-400 hover:text-red-500 hover:bg-gray-50"}`}>
                        <IconDelete />
                      </button>
                    </div>
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
