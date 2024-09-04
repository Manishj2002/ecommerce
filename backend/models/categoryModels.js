import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
    name:{
        type:String,
        trim:true,
        maxLength:32,
        required:true,
        unique:true
    }
})

const Category = mongoose.model("Category",categorySchema)

export default Category;