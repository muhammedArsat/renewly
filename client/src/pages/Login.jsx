import React, { useContext, useState } from "react";
import { Mail, Eye, EyeOff, Lock } from "lucide-react";
import { signIn } from "../apis/AuthApi";
import AuthContext from "../hooks/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Login = () => {
  const navigate = useNavigate();
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setAuth } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await signIn(formData);
      if (res.success) {
        setAuth({
          id: res.data.user._id,
          name: res.data.user.name,
          email: res.data.user.email,
          gender: res.data.user.gender,
          profile: res.data.user.profile,
        });
        toast.success(res.dataw);
        navigate("/home");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-[91vh] md:min-h-screen p-2">
      {/* left side */}
      <div className="bg-light-card dark:bg-dark-card w-full md:max-w-[450px] min-h-[500px] rounded-xl shadow-light-card p-2 flex flex-col justify-center items-stretch gap-5 md:px-4 relative md:rounded-tr-none md:rounded-br-none">
        <h3 className="font-poppins absolute top-2 left-3 font-semibold">
          Renewly
        </h3>
        {/* login tagline */}
        <div>
          <h1 className="text-center font-poppins font-bold text-2xl">
            Welcome Back
          </h1>
          <h3 className="text-center text-light-textSecondary dark:text-dark-textSecondary font-poppins font-medium text-base">
            Sign in to manage your subscriptions.
          </h3>
        </div>
        {/* login form */}
        <form className="flex flex-col gap-3 relative" onSubmit={handleSignIn}>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="label-base">
              Email
            </label>
            <input
              type="text"
              className="input-base"
              placeholder="E.g jhondoe@gmail.com"
              value={formData.email}
              name="email"
              onChange={handleChange}
              required
            />
            <span className="absolute top-11 left-2">
              <Mail strokeWidth={1.5} />
            </span>
          </div>

          <div className="flex flex-col gap-2 relative">
            <span className="absolute top-11 left-2">
              <Lock strokeWidth={1.5} />
            </span>
            <label htmlFor="password" className="label-base">
              Password
            </label>
            <input
              type={isPasswordShow ? "text" : "password"}
              className="input-base"
              name="password"
              placeholder="E.g Password@123"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span
              className="absolute right-2 top-11 cursor-pointer"
              onClick={() => setIsPasswordShow(!isPasswordShow)}
            >
              {isPasswordShow ? (
                <EyeOff strokeWidth={1.5} />
              ) : (
                <Eye strokeWidth={1.5} />
              )}
            </span>
          </div>

          <div>
            <button className="action-btn w-full" type="submit">
              {loading ? "loading" : "Sign in"}
            </button>
          </div>

          <div className="text-center">
            <h1 className="label-base">
              New to renewly?{" "}
              <span
                className="text-blue-400 underline cursor-pointer"
                onClick={() => navigate("/sign-up")}
              >
                Sign up
              </span>
            </h1>
          </div>
        </form>
      </div>
      {/* right side */}
      <div className="hidden  md:max-w-[450px] min-h-[500px] bg-dark-button text-white rounded-tr-xl rounded-br-xl md:flex md:justify-center md:items-center md:flex-col">
        <h1 className="text-center font-poppins font-bold text-2xl">
          Welcome back
        </h1>
        <p className="text-center font-inter font-normal text-lg">
          Your subscription dashboard is one step away. Stay in control of every
          recurring expense.
        </p>
      </div>
    </div>
  );
};

export default Login;
