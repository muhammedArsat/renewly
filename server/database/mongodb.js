import mongoose from "mongoose";
import{MONGODB_URI, NODE_ENV} from'../config/env.js'

const connectDatabase = async()=>{
  try{
    await mongoose.connect(MONGODB_URI)
    console.log("Mongodb connected ")
  }catch(err){
    console.error('Error connecting to database',err)
    process.exit(1);
  }
}

export default connectDatabase