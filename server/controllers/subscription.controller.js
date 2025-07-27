import { Error } from "mongoose";
import Subscription from "../models/subscription.model.js";

export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });
    res.status(201).json({
      success: true,
      data: subscription,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserSubscription = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      const error = new Error("You are not the owner");
      error.status = 401;
      throw error;
    }
    const { status } = req.query;
    const subscriptions = await Subscription.find({
      user: req.params.id,
      isExpired: status,
    });
    return res.status(200).json({
      success: true,
      data: subscriptions,
    });
  } catch (err) {
    next(err);
  }
};
export const updateSubscription = async (req, res, next) => {
  try {
    const { frequency, price, startDate } = req.body;
    const subscription = await Subscription.findById(req.params.id);
    if (!subscription) {
      const error = new Error("Subscription not existed");
      error.statusCode = 404;
      throw error;
    }

    if (req.user._id.toString() !== subscription.user.toString()) {
      const error = new Error("You are not the owner");
      error.statusCode = 401;
      throw error;
    }

    const currDate = new Date(startDate);
    if (currDate <= subscription.renewalDate) {
      const error = new Error(
        "Renewed date should be future of the Previous Renewal date"
      );
      error.statusCode = 409;
      throw error;
    }

    // ✅ Create a clone of the currDate
    const renewalDate = new Date(currDate);

    if (frequency === "daily") {
      renewalDate.setDate(renewalDate.getDate() + 1);
    } else if (frequency === "weekly") {
      renewalDate.setDate(renewalDate.getDate() + 7);
    } else if (frequency === "monthly") {
      renewalDate.setMonth(renewalDate.getMonth() + 1);
    } else if (frequency === "yearly") {
      renewalDate.setFullYear(renewalDate.getFullYear() + 1);
    } else {
      const error = new Error("Invalid frequency type");
      error.statusCode = 400;
      throw error;
    }

    subscription.renewalDate = renewalDate;
    subscription.startDate = currDate;
    subscription.status = "active";
    subscription.expiredAt = null;
    subscription.isExpired = false;
    subscription.price = price;

    await subscription.save();

    return res.status(201).json({
      success: true,
      message: "Subscription updated",
      data: subscription,
    });
  } catch (err) {
    next(err);
  }
};


export const deleteSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      const error = new Error("Subscription not found");
      error.statusCode = 404;
      throw error;
    }

    // Optional: Check ownership if needed
    if (!subscription.user.equals(req.user._id)) {
      const error = new Error(
        "You are not authorized to delete this subscription"
      );
      error.statusCode = 403;
      throw error;
    }

    await Subscription.deleteOne({ _id: req.params.id });

    return res.status(200).json({
      success: true,
      message: "Successfully deleted",
    });
  } catch (error) {
    next(error);
  }
};

export const getSubscriptionById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const subscription = await Subscription.findById(id);
    if (!subscription) {
      const error = new Error("Subscription not found");
      error.statusCode = 409;
      throw error;
    }
    return res.status(200).json({
      success: true,
      data: subscription,
    });
  } catch (err) {
    next(err);
  }
};
