import asyncHandler from "../middlewares/asyncHandler.js";
import Order from "../models/orderModels.js";
import Product from "../models/productModels.js";

function calcPrices(orderItems) {
    const itemsPrice = orderItems.reduce((acc, item) =>
        acc + item.price * item.qty
    , 0);

    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const taxRate = 0.15;
    
    // Calculate taxPrice without rounding
    const taxPrice = itemsPrice * taxRate;

    // Calculate totalPrice before rounding
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    // Round final prices to two decimal places
    return {
        itemsPrice: itemsPrice.toFixed(2),
        shippingPrice: shippingPrice.toFixed(2),
        taxPrice: taxPrice.toFixed(2),
        totalPrice: totalPrice.toFixed(2)
    };
}


const createOrder = asyncHandler(async(req,res)=>{
    try {
        const {orderItems,shippingAddress,paymentMethod} = req.body;

        if (orderItems && orderItems.length === 0) {
            res.status(400)
            throw new Error("No Order Items");
            
        }

        const itemsFromDb = await Product.find({
            _id:{$in : orderItems.map((x)=> x._id)}
        })

        const dbOrderItems = orderItems.map((itemFromClient)=>{
            const matchingItemFromDb = itemsFromDb.find((itemFromDb)=>itemFromDb._id.toString() === itemFromClient._id)

            if (!matchingItemFromDb) {
                res.status(400)
                throw new Error(`product not found ${itemFromClient}`);
                
            }

            return{
                ...itemFromClient,
                product:itemFromClient._id,
                price:matchingItemFromDb.price,
                _id:undefined
            }

        })

        
        const {itemsPrice,taxPrice,shippingPrice,totalPrice} = calcPrices(dbOrderItems)
        
        const order =new Order({
          orderItems:dbOrderItems,
          user:req.user._id,
          shippingAddress,
          paymentMethod,
          taxPrice,
          itemsPrice,
          shippingPrice,
          totalPrice
        })

        const createOrder = await order.save()

        res.status(201).json(createOrder)
    } catch (error) {
        res.status(500).json({error:error.message})
        
    }
})

const getAllOrders = async(req,res)=>{
    try {
        const orders = await Order.find({}).populate("user"," id username")
        res.json(orders)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}
const getUserOrders = async(req,res)=>{
    try {
        const orders = await Order.find({user:req.user._id})
        res.json(orders)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

const countTotalOrders = async(req,res)=>{
    try {
        const totalOrders = await Order.countDocuments()
        res.json({totalOrders})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}
const calculateTotalSales = async(req,res)=>{
    try {
        const orders = await Order.find()
        const totalSales = orders.reduce((sum,order)=> sum + order.totalPrice ,0)
        res.json({totalSales})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}
const calculateTotalSalesByDate = async(req,res)=>{
    try {
       const salesByDate = await Order.aggregate([
        {
            $match:{
                isPaid:true
            }
        },
        {
            $group:{
                _id:{
                    $dateToString:{format:'%Y/%m/%d',date:"$paidAt"},
                },
                totalSales:{$sum:"$totalPrice"}
            }
        }
       ])
       res.json({salesByDate})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

const getOrderById = async (req, res) => {
    try {
      const order = await Order.findById(req.params.id).populate("user", "username email");
      if (order) {
        res.json(order);
      } else {
        res.status(404);
        throw new Error("Order Not Found");
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  

const markOrderAsPaid= async(req,res)=>{
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
          order.isPaid = true;
          order.paidAt = Date.now();
          order.paymentResult = req.body;
          const updateOrder = await order.save();
          res.json(updateOrder);
        } else {
          res.status(404).json({ error: "Order Not Found" });
        }
        
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}
const markOrderAsDelivery= async(req,res)=>{
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
          order.isDelivered = true;
          order.deliveredAt = Date.now();
          const updateOrder = await order.save();
          res.json(updateOrder);
        } else {
          res.status(404).json({ error: "Order Not Found" });
        }
        
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}
export {createOrder,getAllOrders,getUserOrders,countTotalOrders,calculateTotalSales,calculateTotalSalesByDate,getOrderById,markOrderAsPaid,markOrderAsDelivery}