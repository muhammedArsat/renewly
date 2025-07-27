import React, { createContext, useEffect, useState } from "react";
const Themecontext = createContext();
const Themeprovider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("Theme") === "dark";
  });

  useEffect(() => {
    if (isDark) {
      document.body.classList.add("dark");
      localStorage.setItem("Theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("Theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };
  return (
    <Themecontext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </Themecontext.Provider>
  );
};

export { Themeprovider };
export default Themecontext;
