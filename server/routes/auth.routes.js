import { Router } from "express";
import {
  getMe,
  signIn,
  signOut,
  signUp,
} from "../controllers/auth.controller.js";
import { authorize } from "../middlewares/auth.middleware.js";
const authRouter = Router();

authRouter.post("/sign-up", signUp);

authRouter.post("/sign-in", signIn);

authRouter.post("/sign-out", signOut);

authRouter.get("/getMe", authorize, getMe);

export default authRouter;
