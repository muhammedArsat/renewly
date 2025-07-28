import React, { useEffect, useState } from "react";
import { Lock, ShieldCheck,EyeIcon,EyeOff } from "lucide-react";
const PasswordDetails = ({ formData, handleChange,handleRegister,loading }) => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [isPasswordShow, setIsPasswordShow] = useState(false);

  useEffect(()=>{
    if(formData.password.length>=1 && formData.password.length < 6){
      return setPasswordCheck('Password should be atleast 6 characters ')
    }else if(formData.password.length >= 6){
      setPasswordCheck('')
    }
  },[formData.password])
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-3 relative">
        <span className="absolute top-12 left-2">
          <Lock strokeWidth={1.5} />
        </span>

        <label htmlFor="password" className="label-base">
          Password
        </label>
        <input
          type={isPasswordShow?'text':'password'}
          name="password"
          onChange={handleChange}
          className="input-base"
          placeholder="E.g Password@123"
        />
        <span className="absolute right-2 top-12" onClick={()=> setIsPasswordShow(!isPasswordShow)}>
        {!isPasswordShow ? <EyeIcon/> : <EyeOff/>}
        </span>
      </div>
      <div className="flex flex-col gap-3 relative">
        <span className="absolute top-12 left-2">
          <ShieldCheck strokeWidth={1.5} />
        </span>

        <label htmlFor="confirm password" className="label-base">
          Confirm password
        </label>
        <input
          type="text"
          name="confirmpassword"
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="input-base"
          placeholder="E.g Password@123"
        />
      </div>
      <div>
        <button
          className="action-btn w-full disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={formData.password !== confirmPassword || !formData.password || !confirmPassword || loading }
          onClick={handleRegister}
        >
         {loading? "loading...":" Create"}
        </button>
        {passwordCheck && <p className="text-light-error text-center font-inter p-1">{passwordCheck}</p>}
      </div>
    </div>
  );
};

export default PasswordDetails;
