import { Router } from "express";
import { authorize } from "../middlewares/auth.middleware.js";
import Subscription from "../models/subscription.model.js";
import {
  createSubscription,
  deleteSubscription,
  getSubscriptionById,
  getUserSubscription,
  updateSubscription,
} from "../controllers/subscription.controller.js";
const subscriptionRouter = Router();

subscriptionRouter.get("/", authorize);

subscriptionRouter.get('/:id',authorize,getSubscriptionById)
subscriptionRouter.get("/user/:id", authorize, getUserSubscription);

subscriptionRouter.post("/", authorize, createSubscription);

subscriptionRouter.put("/:id", authorize, updateSubscription);

subscriptionRouter.delete("/:id", authorize,deleteSubscription);

export default subscriptionRouter;
