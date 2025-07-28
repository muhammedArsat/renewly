import React, { useContext, useEffect, useState } from "react";
import Searchbar from "../components/Searchbar";
import SubscriptionCard from "../components/SubscriptionCard";
import EditSubscription from "../components/EditSubscription";
import { X, Plus, IndianRupeeIcon, Trash2 } from "lucide-react";
import {
  deleteSubscriptionById,
  getSubscriptionByUser,
  newSubscription,
  updateSubscriptionById,
} from "../apis/SubscriptionApi";
import { toast } from "react-toastify";
import Authcontext from "../hooks/AuthContext";

const Dashboard = () => {
  const avatarColors = [
    { bg: "#0F3D3E", text: "#00FF84" },
    { bg: "#1E293B", text: "#38BDF8" },
    { bg: "#1A1A2E", text: "#F43F5E" },
    { bg: "#0F172A", text: "#22C55E" },
    { bg: "#1B1B1B", text: "#FACC15" },
    { bg: "#111827", text: "#3B82F6" },
    { bg: "#2C3E50", text: "#E74C3C" },
    { bg: "#4B0082", text: "#FFD700" },
    { bg: "#2F2F2F", text: "#00CED1" },
    { bg: "#0A192F", text: "#64FFDA" },
    { bg: "#1E1E1E", text: "#FF6B6B" },
    { bg: "#1B262C", text: "#BB86FC" },
  ];

  const [isEditTabOpen, setIsEditTabOpen] = useState(false);
  const [isNewTabOpen, setIsNewTabOpen] = useState(false);
  const [isDeleteTabOpen, setIsDeleteTapOpen] = useState(false);
  const [activeSubscriptions, setActiveSubscriptions] = useState([]);
  const [expiredSubscriptions, setExpiredSubscriptions] = useState([]);
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [deleteSubscriptionId, setDeleteSubscriptionId] = useState(null);

  const [loading, setLoading] = useState(false);
  const { id } = useContext(Authcontext);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    frequency: "",
    category: "",
    paymentMethod: "",
    startDate: "",
    user: "",
    bg: "",
    text: "",
  });

  const [editFormData, setEditFormData] = useState({
    name: "",
    price: "",
    frequency: "",
    startDate: "",
  });

  const handleDeleteTapOpen = () => {
    setIsDeleteTapOpen(!isDeleteTabOpen);
  };

  const handleChangeInEdit = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  const getRandomColor = () => {
    const index = Math.floor(Math.random() * avatarColors.length);
    return avatarColors[index];
  };

  const fetchUserActiveSub = async (id) => {
    try {
      const res = await getSubscriptionByUser(id, false);
      setActiveSubscriptions(res.data);
    } catch (err) {
      toast.error(err.response.data.error);
    }
  };

  const fetchUserExpiredSub = async (id) => {
    try {
      const res = await getSubscriptionByUser(id, true);
      setExpiredSubscriptions(res.data);
    } catch (err) {
      toast.error(err.response.data.error);
    }
  };

  useEffect(() => {
    fetchUserActiveSub(id);
    fetchUserExpiredSub(id);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Capitalize first letter only
    const formattedValue =
      name === "name" ? value.charAt(0).toUpperCase() + value.slice(1) : value;

    setFormData({
      ...formData,
      [name]: formattedValue,
    });
  };

  const handleCreate = async () => {
    try {
      setLoading(true);
      const { bg, text } = getRandomColor();

      const newFormData = {
        ...formData,

        bg,
        text,
      };
      const res = await newSubscription(newFormData);
      if (res.success) {
        toast.success("New subscription added");
        setFormData({
          name: "",
          price: "",
          frequency: "",
          category: "",
          paymentMethod: "",
          startDate: "",
          user: "",
          bg: "",
          text: "",
        });
        setIsNewTabOpen(false);
        fetchUserActiveSub(id);
        fetchUserExpiredSub(id);
      }
    } catch (err) {
      toast.error(err.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditOpen = (sub) => {
    setSelectedSubscription(sub);
    setEditFormData({
      name: sub.name,
      price: sub.price,
      frequency: sub.frequency,
      startDate: sub.startDate,
    });
    setIsEditTabOpen(true);
  };

  const handleEditSubscription = async (subId) => {
    try {
      const res = await updateSubscriptionById(subId, editFormData);
      if (res.success) {
        setIsEditTabOpen(false);
        fetchUserActiveSub(id);
        fetchUserExpiredSub(id);
        toast.success("Updated successfully");
      }
    } catch (err) {
      toast.error(err.response.data.error);
    }
  };

  const deleteSubscription = async (id) => {
    try {
      setIsDeleteTapOpen(true);
      setDeleteSubscriptionId(id);
    } catch (err) {
      toast.error(err.response.data.error);
    }
  };

  const ActualDeleteSubscription = async () => {
    try {
      setLoading(true);
      const res = await deleteSubscriptionById(deleteSubscriptionId);
      if (res.success) {
        toast.success("Deleted Successfully");
        const deletedSub = activeSubscriptions.filter(
          (d) => d._id !== deleteSubscriptionId
        );
        const deletedExpiredSub = expiredSubscriptions.filter(
          (d) => d._id !== deleteSubscriptionId
        );
        setActiveSubscriptions(deletedSub);
        setExpiredSubscriptions(deletedExpiredSub);
        setIsDeleteTapOpen(false);
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const calculateTotals = () => {
    let totalMonthly = 0;
    let totalYearly = 0;

    activeSubscriptions.forEach((sub) => {
      const price = parseFloat(sub.price);
      if (sub.frequency === "monthly") {
        totalMonthly += price;
        totalYearly += price * 12;
      } else if (sub.frequency === "yearly") {
        totalYearly += price;
        totalMonthly += price / 12;
      }
    });

    return {
      monthly: totalMonthly.toFixed(2),
      yearly: totalYearly.toFixed(2),
    };
  };
  const [totalCost, setTotalCost] = useState({
    monthly: "",
    yearly: "",
  });

  useEffect(() => {
    const costs = calculateTotals();
    setTotalCost(costs);
  }, [activeSubscriptions]);

  return (
    <div className="flex flex-col gap-2 mx-auto max-h-dvh  md:min-h-[95vh] overflow-auto ">
      <div>
        <h1 className="font-poppins text-2xl font-semibold mb-2">
          Your subscription
        </h1>
        <div className="flex items-center gap-2">
          <h1 className="font-poppins text-light-textSecondary dark:text-dark-textSecondary font-normal flex justify-center items-center">
            Montly:{" "}
            <span className="font-inter text-blue-400 flex justify-center items-center ">
              <IndianRupeeIcon />
              {totalCost.monthly}
            </span>
          </h1>
          <h1 className="font-poppins text-light-textSecondary dark:text-dark-textSecondary font-normal flex justify-center items-center">
            Yearly:{" "}
            <span className="font-inter text-blue-400 flex justify-center items-center ">
              <IndianRupeeIcon />
              {totalCost.yearly}
            </span>
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Searchbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <button
          className="action-btn basis-5/12 md:basis-1/12 h-12 flex justify-center items-center"
          onClick={() => setIsNewTabOpen(true)}
        >
          <Plus />
          Add new
        </button>
      </div>

      <div className="hidden md:grid grid-cols-7 py-2 px-2 gap-4 bg-light-card dark:bg-dark-card rounded-lg w-full mt-2 ">
        <div className="font-poppins text-center ">Plan</div>
        <div className="font-poppins ">Status</div>
        <div className="font-poppins ">Price</div>
        <div className="font-poppins ">Category</div>
        <div className="font-poppins ">Applied date</div>
        <div className="font-poppins ">Renewal date</div>
        <div className="font-poppins  text-center">Edit</div>
      </div>

      <div className="flex flex-col gap-3 mb-3">
        <h1 className="font-poppins text-light-textSecondary dark:text-dark-textSecondary">
          Ended
        </h1>
        <div className="flex flex-col gap-3 ">
          {expiredSubscriptions
            .filter((sub) =>
              sub.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((sub, _idx) => (
              <SubscriptionCard
                key={_idx}
                subscriptionId={sub._id}
                name={sub.name}
                price={sub.price}
                starteDate={sub.startDate}
                renewalData={sub.renewalDate}
                category={sub.category}
                isExpired={true}
                bg={sub.bg}
                text={sub.text}
                handleDelete={deleteSubscription}
                handleOpen={() => handleEditOpen(sub)}
              />
            ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 ">
        <h1 className="font-poppins text-light-textSecondary dark:text-dark-textSecondary">
          Active
        </h1>
        <div className="flex flex-col gap-3">
          {activeSubscriptions
            .filter((sub) =>
              sub.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((sub, _idx) => (
              <SubscriptionCard
                key={_idx}
                subscriptionId={sub._id}
                name={sub.name}
                price={sub.price}
                starteDate={sub.startDate}
                renewalData={sub.renewalDate}
                category={sub.category}
                isExpired={false}
                bg={sub.bg}
                text={sub.text}
                handleDelete={deleteSubscription}
                handleOpen={() => handleEditOpen(sub)}
              />
            ))}
        </div>
      </div>

      {/* EDIT MODAL */}
      {isEditTabOpen && selectedSubscription && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 transition-all duration-500 p-2 
            ${isEditTabOpen ? "opacity-100 visible" : "opacity-0 invisible"}
          `}
          onClick={() => setIsEditTabOpen(false)}
        >
          <div
            className="bg-white dark:bg-dark-card p-6 rounded-xl shadow-xl w-[50rem] text-center flex justify-center items-center relative"
            onClick={(e) => e.stopPropagation()}
          >
            <span
              className="absolute right-2 top-2 cursor-pointer"
              onClick={() => setIsEditTabOpen(false)}
            >
              <X />
            </span>
            <EditSubscription
              formData={editFormData}
              isNewSubscription={false}
              loading={loading}
              handleClick={handleEditSubscription}
              handleChange={handleChangeInEdit}
              subscriptionId={selectedSubscription._id}
              setFormData={setEditFormData}
            />
          </div>
        </div>
      )}

      {/* CREATE NEW MODAL */}
      <div
        className={`fixed inset-0 z-20 flex justify-center items-center bg-black/40 transition-all duration-500
          ${isNewTabOpen ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
        onClick={() => setIsNewTabOpen(false)}
      >
        <div
          className="bg-white dark:bg-dark-card w-[50rem] rounded-lg flex justify-center items-center p-4 relative"
          onClick={(e) => e.stopPropagation()}
        >
          <span
            className="absolute right-2 top-2 cursor-pointer"
            onClick={() => setIsNewTabOpen(false)}
          >
            <X />
          </span>
          <EditSubscription
            isNewSubscription={true}
            handleChange={handleChange}
            formData={formData}
            loading={loading}
            handleClick={handleCreate}
          />
        </div>
      </div>
      {isDeleteTabOpen && (
        <div
          className="inset-0 min-h-screen bg-black/40 fixed z-20 flex justify-center items-center transition-all duration-300 "
          onClick={() => setIsDeleteTapOpen(false)}
        >
          <div
            className={`w-[20rem] bg-light-card rounded-lg min-h-[10rem] flex justify-center items-center flex-col gap-2 transition-all duration-300 ${
              isDeleteTabOpen ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <h1 className="text-center font-poppins">Do you want to delete?</h1>
            <div className="flex gap-2 justify-center items-center">
              <button
                className="bg-gray-400 font-inter font normal text-white flex justify-center items-center p-2 rounded-lg cursor-pointer"
                onClick={() => setIsDeleteTapOpen(false)}
              >
                <X /> Cancel
              </button>
              <button
                className="bg-light-error font-inter font-semibold text-white flex justify-center items-center p-2 rounded-lg cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed "
                onClick={() => ActualDeleteSubscription()}
                disabled={loading}
              >
                <Trash2 />
                {loading ? "loading" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
