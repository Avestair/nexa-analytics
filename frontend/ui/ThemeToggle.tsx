"use client";

import { useEffect, useState } from "react";
import { PiMoonStarsDuotone, PiSunDuotone } from "react-icons/pi";

export function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark =
      localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newMode);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-secondary text-secondary hover:bg-accent hover:text-white transition-colors"
      aria-label="Toggle dark mode"
    >
      {darkMode ? (
        <PiSunDuotone className="h-5 w-5" />
      ) : (
        <PiMoonStarsDuotone className="h-5 w-5" />
      )}
    </button>
  );
}
