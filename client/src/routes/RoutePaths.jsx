import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Navlayout from "../layouts/Navlayout";
import Calender from "../pages/Calender";
import ProtectedRoutes from "./ProtectedRoutes";
const RoutePaths = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sign-up" element={<Register />} />
        <Route element={<ProtectedRoutes />}>
          <Route element={<Navlayout />}>
            <Route path="/home" element={<Dashboard />} />
            <Route path="/calendar" element={<Calender />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default RoutePaths;
