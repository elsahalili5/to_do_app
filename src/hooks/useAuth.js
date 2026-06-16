import { useState } from "react";

function getInitialAuth() {
  return localStorage.getItem("isLoggedIn") === "true";
}

function getInitialUser() {
  const saved = localStorage.getItem("user");
  return saved ? JSON.parse(saved) : null;
}

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(getInitialAuth);
  const [user, setUser] = useState(getInitialUser);

  function login(email) {
    const userData = { email };
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("user", JSON.stringify(userData));
    setIsLoggedIn(true);
    setUser(userData);
  }

  function logout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
  }

  return { isLoggedIn, user, login, logout };
}
