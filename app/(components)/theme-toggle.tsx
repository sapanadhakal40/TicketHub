"use client";

import { useTheme } from "next-themes";
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from "react";

const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null; 

    return (
        <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
        {theme === 'light' ? (
          <FontAwesomeIcon icon={faMoon} />
        ) : (
          <FontAwesomeIcon icon={faSun}  />
        )}
      </button>
    );
}
 export default ThemeToggle;