import React, { useContext } from "react";
import { Moon } from "lucide-react";
import ThemeContext from "../hooks/Themecontext";
const ThemeButton = ({ isNavbarExpand , isMobile }) => {
  const { isDark, toggleTheme } = useContext(ThemeContext);
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <Moon strokeWidth={1} onClick={toggleTheme}/>
        <span className={`${!isNavbarExpand || isMobile ? "block" : "hidden"}`}>
          Dark
        </span>
      </div>
      <button
        className={`w-12 h-7 bg-gray-300 dark:bg-gray-700 rounded-full relative ${
          !isNavbarExpand || isMobile ? "block" : "hidden"
        }`}
        onClick={toggleTheme}
      >
        <span
          className={`absolute w-5 h-5 bg-white top-1 left-1 shadow-light rounded-full transition-all duration-300 ${
            !isDark ? "translate-x-0" : "translate-x-5"
          }`}
        ></span>
      </button>
    </div>
  );
};

export default ThemeButton;
