import React, { useEffect } from "react";
import { Layers, IndianRupee, Repeat, CalendarClock, Tags, CreditCardIcon } from "lucide-react";
import { toast } from "react-toastify";
import { findSubscriptionById } from "../apis/SubscriptionApi";
const EditSubscription = ({
  isNewSubscription,
  formData,
  setFormData,
  handleChange,
  loading,
  handleClick,
  subscriptionId,
}) => {
  const fetchSubscriptionDetail = async () => {
    try {
      const res = await findSubscriptionById(subscriptionId);
      const formatedDate = res.data.renewalDate.split("T")[0];
      setFormData({
        name: res.data.name,
        frequency: res.data.frequency,
        price: res.data.price,
        startDate: formatedDate,
      });
    } catch (err) {
      toast.error(err.response.data.err);
    }
  };

  useEffect(() => {
    if (!isNewSubscription) {
      fetchSubscriptionDetail();
    }
  }, [subscriptionId]);
  return (
    <div className="flex flex-col gap-3 ">
      <h1 className="font-poppins font-bold text-xl text-center">
        {isNewSubscription
          ? "Create new subscription"
          : "Edit your subscription"}
      </h1>
      <div className="flex flex-col  gap-3 relative">
        <div className="flex flex-col gap-2 md:flex-row ">
          <div className="flex flex-col gap-2">
            <span className="absolute top-11 left-2">
              <Layers strokeWidth={1.5} />
            </span>
            <label htmlFor="" className="text-left label-base">
              Plan
            </label>
            <input
              type="text"
              className="input-base"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!isNewSubscription}
              placeholder="E.g Netflix premium"
            />
          </div>
          <div className="flex flex-col gap-2 relative">
            <span className="absolute top-11 left-2">
              <IndianRupee strokeWidth={1.5} />
            </span>
            <label htmlFor="" className="text-left label-base">
              Price
            </label>
            <input
              type="number"
              className="input-base"
              placeholder="E.g 149"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-2 w-full">
          <div className="flex flex-col gap-2 w-full relative">
            <span className="absolute top-11 left-2">
              <Repeat strokeWidth={1.5} />
            </span>
            <label htmlFor="" className="text-left label-base">
              Frequency
            </label>
            <select
              className="input-base bg-transparent"
              name="frequency"
              value={formData.frequency}
              onChange={handleChange}
            >
              <option value="" disabled selected>
                --select frequency--
              </option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
          <div className="flex flex-col gap-2 w-full  relative">
            <span className="absolute top-11 left-2">
              <CalendarClock strokeWidth={1.5} />
            </span>
            <label htmlFor="" className="text-left label-base">
              {isNewSubscription ? "Applied date" : "Renewed date"}
            </label>
            <input
              type="date"
              className="input-base "
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
            />
          </div>
        </div>
        {isNewSubscription && (
          <div className="flex flex-col md:flex-row gap-2 w-full">
            <div className="flex flex-col gap-2 w-full relative">
              <span className="absolute top-11 left-2">
                <Tags strokeWidth={1.5} />
              </span>
              <label htmlFor="" className="text-left label-base">
                Category
              </label>
              <select
                className="input-base bg-transparent"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="" disabled selected>
                  --select category--
                </option>
                <option value="Entertainment">Entertainment</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Sports">Sports</option>
                <option value="Technology">Technology</option>
                <option value="Other">Others</option>
              </select>
            </div>
            <div className="flex flex-col gap-2 w-full relative">
              <span className="absolute top-11 left-2"><CreditCardIcon/></span>
              <label htmlFor="paymentMethod" className="label-base text-left">
                Payment method
              </label>
              <select
                className="input-base bg-transparent"
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
              >
                <option value="" disabled selected>
                  --select payment method--
                </option>
                <option value="Upi">Upi</option>
                <option value="Credit card">Credit card</option>
                <option value="Debit card">Debit card</option>
              </select>
            </div>
          </div>
        )}
        <button
          className="action-btn mt-2"
          disabled={loading}
          onClick={() => {
            isNewSubscription ? handleClick() : handleClick(subscriptionId);
          }}
        >
          {loading ? "Loading..." : "Update"}
        </button>
      </div>
    </div>
  );
};

export default EditSubscription;
