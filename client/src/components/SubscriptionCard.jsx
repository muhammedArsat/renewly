import React from "react";
import { SquarePen, IndianRupeeIcon, Trash2 } from "lucide-react";

const SubscriptionCard = ({
  subscriptionId,
  isExpired,
  handleOpen,
  name,
  price,
  starteDate,
  renewalData,
  category,
  bg,
  text,
  handleDelete,
}) => {
  return (
    <>
      {/* Desktop View (md and up) */}
      <div className="hidden md:grid grid-cols-7 gap-4 items-center justify-center px-4 py-8 bg-light-card dark:bg-dark-card rounded-lg shadow-light dark:shadow-dark w-full">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-full flex justify-center items-center font-poppins font-semibold"
            style={{ backgroundColor: bg, color: text }}
          >
            {name.charAt(0).toUpperCase()}
          </div>
          <h1 className="font-inter text-lg">{name}</h1>
        </div>
        <div
          className={`${
            isExpired ? "text-light-error" : "text-light-success"
          } font-inter text-lg`}
        >
          {isExpired ? "Expired" : "Active"}
        </div>
        <div className="font-inter text-lg flex gap-2 items-center">
          <IndianRupeeIcon strokeWidth={1.5} />
          {price}
        </div>
        <div className="font-inter text-lg">{category}</div>

        <div className="font-inter text-lg">{starteDate.slice(0, 10)}</div>
        <div className="font-inter text-lg">{renewalData.slice(0, 10)}</div>
        <div className="flex justify-center">
          <div
            className="px-2 cursor-pointer mr-2"
            onClick={() => handleDelete(subscriptionId)}
          >
            <Trash2 />
          </div>
          <div className="px-2 cursor-pointer" onClick={handleOpen}>
            <SquarePen />
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden flex flex-col gap-2 px-4 py-4 bg-light-card dark:bg-dark-card rounded-lg shadow-light dark:shadow-dark w-full">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-full flex justify-center items-center font-poppins font-semibold"
            style={{ backgroundColor: bg, color: text }}
          >
            {name.charAt(0).toUpperCase()}
          </div>
          <h1 className="font-inter font-medium">{name} </h1>
         
            <Trash2 onClick={()=> handleDelete(subscriptionId)} />
         
          <SquarePen onClick={handleOpen} />
        </div>

        <div className="flex justify-between">
          <span className="text-sm text-gray-500 font-poppins">Status</span>
          <span
            className={`font-inter ${
              isExpired ? "text-light-error" : "text-light-success"
            }`}
          >
            {isExpired ? "Expired" : "Active"}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-sm font-poppins text-gray-500">Price</span>
          <span className="font-inter flex justify-center items-center">
            <IndianRupeeIcon /> {price}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-sm text-gray-500 font-poppins">Applied</span>
          <span className="font-inter">{starteDate.slice(0, 10)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-sm text-gray-500 font-poppins">Renewal</span>
          <span className="font-inter">{renewalData.slice(0, 10)}</span>
        </div>
      </div>
    </>
  );
};

export default SubscriptionCard;
