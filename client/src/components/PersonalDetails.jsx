import React from "react";
import { User, Mail, VenusAndMars, Phone } from "lucide-react";
const PersonalDetails = ({ formData, handleChange }) => {
  return (
    <div className="flex flex-col gap-3 ">
      <div className="flex flex-col gap-3 relative">
        <span className="absolute top-12 left-2">
          <User strokeWidth={1.5} />
        </span>
        <label htmlFor="name" className="label-base">
          Name
        </label>
        <input
          type="text"
          className="input-base"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="E.g Jhon Doe"
        />
      </div>
      <div className="flex flex-col gap-3 relative">
        <span className="absolute top-12 left-2">
          <Mail strokeWidth={1.5} />
        </span>
        <label htmlFor="Email" className="label-base">
          Email
        </label>
        <input
          type="text"
          className="input-base"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="E.g jhondoe@gmail.com"
        />
      </div>
      <div className="flex flex-col gap-3 relative">
        <span className="absolute top-12 left-2">
          <VenusAndMars strokeWidth={1.5} />
        </span>
        <label htmlFor="gender" className="label-base">
          Gender
        </label>
        <select name="gender" id="" className="input-base bg-transparent" value={formData.gender} onChange={handleChange}>
          <option value="" selected disabled>
            --Select gender--
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div className="flex flex-col gap-3 relative">
        <span className="absolute top-12 left-2">
          <Phone strokeWidth={1.5} />
        </span>

        <label htmlFor="phone" className="label-base">
          Phone no
        </label>
        <input
          type="text"
          className="input-base"
          name="phoneNo"
          value={formData.phoneNo}
          onChange={handleChange}
          placeholder="E.g 9446638043"
        />
      </div>
    </div>
  );
};

export default PersonalDetails;
