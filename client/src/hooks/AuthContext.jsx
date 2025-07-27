import React, { createContext, useEffect, useState } from "react";
import { getMe } from "../apis/AuthApi";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    id: "",
    name: "",
    email: "",
    gender: "",
    profile: "",
  });
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await getMe();
      // console.log(res)
      if (res.success) {
        setAuth({
          id: res.data.id,
          name: res.data.name,
          email: res.data.email,
          gender: res.data.gender,
          profile: res.data.profile,
        });
      }
    } catch (err) {
      setAuth({
        id: "",
        name: "",
        email: "",
        gender: "",
        profile: "",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true)
    fetchUser();
  }, []);
  return (
    <AuthContext.Provider value={{ ...auth,setAuth, fetchUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
export default AuthContext;
