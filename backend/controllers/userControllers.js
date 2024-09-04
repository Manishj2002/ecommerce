import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/userModels.js";
import createToken from '../utils/createToken.js'
import bcrypt from 'bcryptjs'
const createUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        throw new Error('Please fill all the fields');
    }

    const existUser = await User.findOne({ email });
    if (existUser) {
        return res.status(401).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, email, password: hashPassword });

    try {
        await newUser.save();
         createToken(res,newUser._id)
        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
        });
    } catch (error) {
        console.error(error); // Log the error to see what went wrong
        res.status(400).json({ message: 'Failed to create user', error: error.message });
    }
});


const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Check if user exists
    const existUser = await User.findOne({ email });

    if (existUser) {
        // Compare password with hashed password in the database
        const isPasswordCorrect = await bcrypt.compare(password, existUser.password);

        if (isPasswordCorrect) {
            // Create token and set it in a cookie or response
            createToken(res, existUser._id);

            // Respond with user data
            res.status(201).json({
                _id: existUser._id,
                username: existUser.username,
                email: existUser.email,
                isAdmin: existUser.isAdmin,
            });
            return;
        }
    }

    // If the user does not exist or password is incorrect, send an error response
    res.status(401).json({ message: "Invalid email or password" });
});

const logoutUser = asyncHandler(async(req,res)=>{
    res.cookie('jwt','',{
        httpOnly:true,
        expires:new Date(0)
    })
    res.status(200).json({message:'logout successfully'})
})

const getAllUsers = asyncHandler(async(req,res)=>{
    const users = await User.find({})
    res.json(users)
})

const getCurrentUserProfile = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user._id)
    if (user) {
        res.json({_id:user._id,username:user.username,email:user.email})
    }else{
        res.status(401)
        throw new Error('user not found')
    }
})

const updateCurrntUserProfile = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user._id)
    if (user) {
        user.username = req.body.username || user.username
        user.email = req.body.email || user.email
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hash(req.body.password, salt);
          user.password = hashPassword;
         }
         const updatedUser = await user.save()
        res.json({_id:updatedUser._id,username:updatedUser.username,email:updatedUser.email,isAdmin:updatedUser.isAdmin})
    }else{
        res.status(401)
        throw new Error('user not found')
    }
})

const deleteUser = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id)

    if (user) {
        if (user.isAdmin) {
            res.status(401)
           throw new Error('Admin can not be deleted')
        }

        await User.deleteOne({_id:user._id})

        res.json({message:"user removed successfully"})
    }else{
        res.status(401)
        throw new Error('user not found')
    }
})
const getUserById = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id).select('-password')

    if (user) {
        res.json(user)
    }else{
        res.status(401)
        throw new Error('user not found')
    }
})

const updateUserById = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id)

    if (user) {
        user.username = req.body.username || user.username
        user.email = req.body.email || user.email
        user.isAdmin = Boolean(req.body.isAdmin)

        const updatedUser = await user.save()

        res.json({_id:updatedUser._id,username:updatedUser.username,email:updatedUser.email,isAdmin:updatedUser.isAdmin})
    }else{
        res.status(401)
        throw new Error('user not found')
    }
})


export {createUser,loginUser,logoutUser,getAllUsers,getCurrentUserProfile,updateCurrntUserProfile,deleteUser,getUserById,updateUserById}