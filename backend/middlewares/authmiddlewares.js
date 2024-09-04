import User from "../models/userModels.js";
import asyncHandler from "./asyncHandler.js";
import jwt from 'jsonwebtoken'
const authenticate = asyncHandler(async(req,res,next)=>{
    let token;

    token = req.cookies.jwt

    if (token) {
       try {
        let decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = await User.findById(decoded.userId).select("-password")
        next()
       } catch (error) {
        res.status(401).json({message:"not authorized,token failed"})
       }
    }else{
        res.status(401).json({message:"not authorized,no token"})
    }
})

const authorized = asyncHandler(async(req,res,next)=>{
    if (req.user && req.user.isAdmin) {
        next()
    }else{
        res.status(401).json({message:"not authorized as Admin"})
    }
})

export {authenticate,authorized}