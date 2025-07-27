import React from "react";
import RoutePaths from "./routes/RoutePaths";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Themeprovider } from "./hooks/Themecontext";
import { AuthProvider } from "./hooks/AuthContext";
const App = () => {
  return (
    <div>
   
        <Themeprovider>
          <RoutePaths />
          <ToastContainer position="top-right" autoClose={3000} />
        </Themeprovider>
      
    </div>
  );
};

export default App;
