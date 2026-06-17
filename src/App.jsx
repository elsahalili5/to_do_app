import LoginPage from "./components/LoginPage";
import TodoPage from "./components/TodoPage";
import { useAuth } from "./hooks/useAuth";
import "./App.css";

export default function App() {
  const { isLoggedIn, login, logout } = useAuth();

  return isLoggedIn ? (
    <TodoPage onLogout={logout} />
  ) : (
    <LoginPage onLogin={login} />
  );
}
