import express from "express";
import { PORT } from "./config/env.js  ";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import connectDatabase from "./database/mongodb.js";
import cookieParser from "cookie-parser";
import { arjectMiddleware } from "./middlewares/arcjet.middleware.js";
import { startExpireAndNotifyJob } from "./jobs/expireAndNotifyJob.js";
import { FRONTEND_URL } from "./config/env.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(arjectMiddleware);
app.use(cookieParser());
app.use(
  cors({
    origin: "https://renewly.onrender.com/",
    credentials: true,
  })
);
// console.log("CORS Origin Allowed:",FRONTEND_URL);

await connectDatabase();
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);
app.use(errorMiddleware);

startExpireAndNotifyJob();

app.get("/", (req, res) => {
  res.send("Welcome to the subscription_backend");
});

app.listen(PORT, () => {
  console.log(`Subscription_backend is running on http://localhost:${PORT} `);
});

export default app;
