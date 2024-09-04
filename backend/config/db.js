import mongoose from "mongoose";

const connectDb = async() =>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('mongodb connected successfully 👍')
    } catch (error) {
        console.log(`Error:${error.message}`)
        process.exit(1)
    }
}

export default connectDb;

