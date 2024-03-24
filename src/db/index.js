import mongoose from "mongoose"
import { db_name } from "../constants.js"


const connectDB= async ()=>{
    try{
      const response=await mongoose.connect(`${process.env.MONGODB_URI}/${db_name}`)
      console.log(`/nMongodb Connected!! DB Host: ${response.connection.host}`)
    }catch(e){
        console.log(`mongodb connection error is ${e}`);
        process.exit(1);
    }
}






export default connectDB;