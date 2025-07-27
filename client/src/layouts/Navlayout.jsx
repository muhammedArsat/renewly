import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const Navlayout = () => {
  return (
    <div className="md:flex ">
      <Navbar />
      <main className="md:p- w-full p-2">
        <Outlet />
      </main>
    </div>
  );
};

export default Navlayout;
