import React, { useEffect, useState } from "react";
import PasswordDetails from "../components/PasswordDetails";
import PersonalDetails from "../components/PersonalDetails";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";
import { signUp } from "../apis/AuthApi";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    phoneNo: "",
    password: "",
  });

  const handleRegister = async () => {
    try {
      if (formData.password < 6) {
        return toast.warn("password must be greater than 6 character");
      }
      const res = await signUp(formData);
      if (res.success) {
        navigate("/");
      }
    } catch (err) {
      toast.error(err.response.data.error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="flex justify-center items-center min-h-[91vh] md:min-h-screen p-2">
      {/* left side */}
      <div className="hidden  md:max-w-[450px] min-h-[550px] bg-dark-button text-white rounded-tl-xl rounded-bl-xl md:flex md:justify-center md:items-center md:flex-col">
        <h1 className="font-poppins text-2xl text-center font-bold mb-2">
          Create your account here
        </h1>
        <p className="font-inter text-lg text-center font-normal">
          Discover a better way to organize and grow. We’re excited to have you
          onboard.
        </p>
      </div>

      {/* right side  */}
      <div className="bg-light-card dark:bg-dark-card w-full md:max-w-[450px] min-h-[550px] rounded-xl shadow-light-card p-2 flex flex-col justify-center items-stretch gap-5 md:px-4 relative md:rounded-tl-none md:rounded-bl-none">
        <div className="flex flex-col gap-2">
          <h3 className="font-poppins text-base font-bold">Renewly</h3>
          <h1 className="text-center font-poppins text-xl font-semibold">
            Create your account
          </h1>
        </div>
        <div className="w-full flex justify-center items-center ">
          <div className="relative w-full max-w-md h-[450px] overflow-hidden bg-white rounded-md dark:bg-dark-card">
            {/* Sliding Container */}
            <div
              className={`w-[200%] h-full flex transition-transform duration-500 ease-in-out transform ${
                step === 0 ? "translate-x-0" : "-translate-x-1/2"
              }`}
            >
              {/* PersonalDetails Section */}
              <div className="w-1/2 p-4 ">
                <PersonalDetails
                  formData={formData}
                  handleChange={handleChange}
                />
                <div className="flex justify-end">
                  <button
                    onClick={() => setStep(1)}
                    disabled={
                      !formData.email ||
                      !formData.name ||
                      !formData.gender ||
                      !formData.phoneNo
                    }
                    className="mt-4 bg-light-button text-white px-4 py-2 rounded-full disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    <ArrowRight />
                  </button>
                </div>
              </div>

              {/* PasswordDetails Section */}
              <div className="w-1/2 p-4 flex flex-col justify-between">
                <PasswordDetails
                  formData={formData}
                  handleChange={handleChange}
                  handleRegister={handleRegister}
                />
                <div className="flex justify-between items-center ">
                  <button
                    onClick={() => setStep(0)}
                    className=" bg-light-button text-white px-4 py-2 rounded-full"
                  >
                    <ArrowLeft />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
