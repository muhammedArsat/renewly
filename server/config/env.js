import { config } from "dotenv";

config()
export const { PORT, NODE_ENV, MONGODB_URI, JWT_SECRET, JWT_EXPIRES_IN,ARCJET_KEY,ARCJET_ENV,EMAIL_PASS,EMAIL_USER ,FRONTEND_URL} =
  process.env;
