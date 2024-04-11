import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { user } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser= asyncHandler( async (req,res)=>{
       const {username,email,fullname,password}=req.body;
       console.log(password)
       console.log(username)
       console.log(email)

       if([username,email,fullname,password].some( (field)=>(field?.trim()===""))){
         throw new ApiError(400,"All field are required")
       }

       const existedUser=user.findOne({
          $or:[{username},{email}]
       })
       if(existedUser){
         throw new ApiError(409,"Users with email or username already exist")
       }

       const avatarLocalPath=req.files?.avatar[0]?.path;
       const coverImageLocalPath=req.files?.coverImage[0]?.path;

       if(!avatarLocalPath){
          throw new ApiError(400,"Avatar file is required")
       }

       const avatar=await uploadOnCloudinary(avatarLocalPath)
       const coverImage=await uploadOnCloudinary(coverImageLocalPath)

       if(!avatar){
        throw new ApiError(400,"Avatar file is required")
       }
       

       const user=await user.create({
        fullname,
        email,
        password,
        username:username.toLowerCase(),
        avatar:avatar.url,
        coverImage:coverImage?.url
       })

       const createdUser= await user.findById(user._id).select(
        "-password -refreshToken"
       )

       
       if(!createdUser){
        throw new ApiError(500,"something went wrong while registering the user")
       }

       return res.status(201).json(
         new ApiResponse(200,createdUser,"user registered successfully")
       )
})
export {registerUser}