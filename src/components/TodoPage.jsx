export default function TodoPage({ onLogout }) {
  return (
    <div className="todo-wrapper">
      <header className="todo-header">
        <h1>My Tasks</h1>
        <button className="logout-btn" onClick={onLogout}>Log Out</button>
      </header>
    </div>
  )
}
