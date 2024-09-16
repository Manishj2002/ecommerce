import express from "express";
import path from 'path'
import cookieParser from "cookie-parser";
import dotenv from 'dotenv'
import connectDb from "./config/db.js";
import userRoutes from './routes/userRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

dotenv.config()
const port = process.env.PORT || 5000

const __dirname = path.resolve()

connectDb()


const app = express()


app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/api/users',userRoutes)
app.use('/api/category',categoryRoutes)
app.use('/api/products',productRoutes)
app.use('/api/orders',orderRoutes)
app.use('/api/upload',uploadRoutes)



app.use('/api/config/paypal',(req,res)=>{
    res.send({clientId:process.env.PAYPAL_CLIENT_ID})
})


app.use('/uploads',express.static(path.join(__dirname + '/uploads')))

app.use(express.static(path.join(__dirname,"/frontend/dist")))

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","dist","index.html"))
})

app.listen(port,function () {
    console.log(`server running on port ${port}`)
})