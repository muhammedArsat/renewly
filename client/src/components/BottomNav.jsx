import React, { useContext } from "react";
import ThemeButton from "./ThemeButton";
import { LogOut } from "lucide-react";
import { signOut } from "../apis/AuthApi";
import { useNavigate } from "react-router-dom";
import AuthContext from "../hooks/AuthContext";

const BottomNav = ({ isNavbarExpand, isMobile }) => {
  const { email, name } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      
      const res = await signOut();
   
      if (res.success) {
        localStorage.removeItem("Theme");
        navigate("/");
      }
    } catch (err) {}
  };
  return (
    <div className="flex flex-col gap-3">
      <ul className="flex flex-col gap-3">
        <li className="flex items-center gap-1 py-2 px-3">
          <ThemeButton isNavbarExpand={isNavbarExpand} isMobile={isMobile} />
        </li>
        <li className="flex items-center gap-1 py-2 px-3 text-light-error hover:bg-red-200 hover:text-black">
          <LogOut strokeWidth={1} onClick={handleLogout} />
          <span
            className={`${!isNavbarExpand || isMobile ? "block" : "hidden"}`}
            onClick={handleLogout}
          >
            Logout
          </span>
        </li>
      </ul>
      <div
        className={`flex justify-start items-center gap-2 border-t pl-2 ${
          !isNavbarExpand || isMobile ? "pl-2" : "pl-0"
        }`}
      >
        <div className="w-8 h-8 rounded-full bg-[#0F3D3E] text-[#00FF84] md:mt-1 font-poppins font-bold flex justify-center items-center ">
          {name[0]}
        </div>
        <div>
          <p className="max-w-[175px] truncate font-poppins">
            <span
              className={`${
                !isNavbarExpand || isMobile ? "block" : "hidden"
              } truncate`}
            >
              {name}
            </span>
          </p>
          <h1 className="max-w-[165px] truncate font-inter text-light-textSecondary dark:text-dark-textSecondary">
            <span
              className={`${
                !isNavbarExpand || isMobile ? "block" : "hidden"
              } truncate`}
            >
              {email}
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default BottomNav;
