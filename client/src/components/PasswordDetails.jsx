import React, { useState } from "react";
import { Lock, ShieldCheck } from "lucide-react";
const PasswordDetails = ({ formData, handleChange,handleRegister }) => {
  const [confirmPassword, setConfirmPassword] = useState("");
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
          type="password"
          name="password"
          onChange={handleChange}
          className="input-base"
          placeholder="E.g Password@123"
        />
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
          className="action-btn w-full disabled:bg-gray-400"
          disabled={formData.password !== confirmPassword || !formData.password || !confirmPassword}
          onClick={handleRegister}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default PasswordDetails;
