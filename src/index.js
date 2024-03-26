import dotenv from "dotenv"
import connectDB from "./db/index.js"

dotenv.config({
    path:"./env"
})



connectDB()
.then( ()=>{
   app.listen(process.env.PORT || 8000, ()=>{
      console.log(`server is running at port: ${process.env.PORT}`)
   })
})
.catch( (e)=>{
   console.log("mongo db connection failed", e);
})


/*
import express from "express";
const app=express();

;( async()=>{
   try{
     await mongoose.connect(`${process.env.MONGODB_URI}/${db_name}`);
     app.listen(process.env.PORT,()=>{
        console.log(`App is listening on ${process.env.PORT}`)
     })
   }catch(e){
    console.log("error: ",e)
   }
})()
*/