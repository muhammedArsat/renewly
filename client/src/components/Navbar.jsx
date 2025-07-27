import React, { useContext, useEffect, useState } from "react";
import {
  Menu,
  LayoutDashboard,
  PlusSquare,
  Calendar1,
  ChevronLeft,
  Settings,
} from "lucide-react";
import BottomNav from "./BottomNav";
import Themecontext from "../hooks/Themecontext";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
const Navbar = () => {
  const { isDark, toggleTheme } = useContext(Themecontext);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isNavExpand, setIsNavExpand] = useState(true);
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;

    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = originalOverflow;
    }
    return () => (document.body.style.overflow = originalOverflow);
  }, [isMobileOpen]);
  return (
    <nav
      className={`flex justify-between   px-3 py-5 shadow-light relative w-full  md:min-h-screen bg-light-card md:flex-col transition-all duration-300 dark:bg-dark-card ${
        !isNavExpand ? "md:max-w-[250px]" : "md:max-w-[75px]"
      }`}
    >
      <div className="flex justify-between w-full md:flex-col">
        <h1
          className={`font-poppins text-xl font-semibold tracking-wide md:mb-2 flex justify-center items-center md:border-b md:pb-2 ${
            isNavExpand ? "justify-center" : "justify-between"
          }`}
        >
          <span className="md:hidden">Renewly</span>
          <span className={`hidden ${isNavExpand ? "md:hidden" : "md:block"}`}>
            Renewly
          </span>
          <span
            className={`hidden md:block transition-all duration-300 cursor-pointer ${
              !isNavExpand ? "rotate-[0deg]" : "rotate-[180deg]"
            }`}
            onClick={() => setIsNavExpand((prev) => !prev)}
          >
            <ChevronLeft />
          </span>
        </h1>
        <Menu
          strokeWidth={1.5}
          className="md:hidden"
          onClick={() => setIsMobileOpen((prev) => !prev)}
        />
        <ul className="hidden md:flex  transition-colors duration-300 ">
          <div className="flex flex-col gap-3 w-full">
            <li
              className={`flex items-center gap-1 py-3 px-1 w-full ${
                path === "/home"
                  ? "bg-gradient-to-r from-light-button to-purple-300 text-white border-l-4 border-purple-300"
                  : ""
              } ${isNavExpand ? "justify-center" : ""}`}
              onClick={() => navigate("/home")}
            >
              <LayoutDashboard strokeWidth={1.5} />
              <span className={`${isNavExpand ? "hidden" : "block"}`}>
                Dashboard
              </span>
            </li>

            <li
              className={`flex items-center gap-1 py-3 px-1 w-full ${
                path === "/calendar"
                  ? "bg-gradient-to-r from-light-button to-purple-300 dark:bg-dark-button border-l-4 text-white border-purple-300"
                  : ""
              } ${isNavExpand ? "justify-center" : ""}`}
              onClick={() => navigate("/calendar")}
            >
              <Calendar1 strokeWidth={1.5} />
              <span className={`${isNavExpand ? "hidden" : "block"}`}>
                Calender
              </span>
            </li>
          </div>
        </ul>
      </div>

      {/* mobile nav  */}
      <ul
        className={`md:hidden absolute bg-light-card dark:bg-dark-card left-0 top-[4.4rem] flex justify-between flex-col min-h-[calc(100dvh-4.5rem)] min-w-[250px] rounded-tr-lg rounded-br-lg transition-all duration-300 z-20 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-3">
          <li
            className={`flex items-center gap-1 py-3 px-3  ${
              path === "/home"
                ? "bg-light-button dark:bg-dark-button text-white"
                : ""
            }`}
          >
            <LayoutDashboard strokeWidth={1} />
            <span>Dashboard </span>
          </li>

          <li className="flex items-center gap-1 py-3 px-3">
            <Calendar1 strokeWidth={1} />
            <span>Calender</span>
          </li>
        </div>
        <div>
          <BottomNav isNavbarExpand={isNavExpand} isMobile={true} />
        </div>
      </ul>

      <div className="hidden md:flex md:flex-col ">
        <BottomNav isNavbarExpand={isNavExpand} isMobile={false} />
      </div>
    </nav>
  );
};

export default Navbar;
