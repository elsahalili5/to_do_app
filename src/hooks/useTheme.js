import { useState } from "react";

function getInitialTheme() {
  return localStorage.getItem("theme") || "light";
}

export function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme);

  function toggleTheme() {
    const next = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", next);
    setTheme(next);
  }

  return { theme, toggleTheme };
}
