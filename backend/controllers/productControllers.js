import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModels.js";

const addProduct = asyncHandler(async(req,res)=>{
   try {
    const {name,description,price,quantity,brand,category} = req.fields;
    switch (true) {
        case !name:
           return res.status(400).json({error:"Name is required"})
        case !description:
           return res.status(400).json({error:"description is required"})
        case !price:
           return res.status(400).json({error:"price is required"})
        case !quantity:
           return res.status(400).json({error:"quantity is required"})
        case !brand:
           return res.status(400).json({error:"brand is required"})
        case !category:
           return res.status(400).json({error:"category is required"})
    }

    const product = new Product({...req.fields})
    product.save()
    res.json(product)
   } catch (error) {
    console.log(error)
    res.status(404).json(error.message)
   }
})

const updateProductDetails = asyncHandler(async(req,res)=>{
   try {
    const {name,description,price,quantity,brand,category} = req.fields;
    switch (true) {
        case !name:
           return res.status(400).json({error:"Name is required"})
        case !description:
           return res.status(400).json({error:"description is required"})
        case !price:
           return res.status(400).json({error:"price is required"})
        case !quantity:
           return res.status(400).json({error:"quantity is required"})
        case !brand:
           return res.status(400).json({error:"brand is required"})
        case !category:
           return res.status(400).json({error:"category is required"})
    }

    const product = await Product.findByIdAndUpdate(req.params.id,{...req.fields},{new:true})
    await product.save()
    res.json(product)
   } catch (error) {
    console.log(error)
    res.status(404).json(error.message)
   }
})

const deleteProduct = asyncHandler(async(req,res)=>{
    try {
        const product = await Product.findByIdAndDelete(req.params.id)
        res.json(product)
    } catch (error) {
        console.log(error)
    res.status(500).json('server error')
    }
})

const fetchProducts = asyncHandler(async (req, res) => {
    try {
      const pageSize = 12;
      const keyword = req.query.keyword
        ? { name: { $regex: req.query.keyword, $options: "i" } }
        : {};
  
      const count = await Product.countDocuments({ ...keyword });
      const products = await Product.find({ ...keyword })
        .limit(pageSize)
 
  
      res.json({
        products,
        page:1,
        pages: Math.ceil(count / pageSize),
        hasMore:false,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  });

  const getProductById = asyncHandler(async(req,res)=>{
    try {
        const product = await Product.findById(req.params.id)
        if (product) {        
           return res.json(product)
        }else{
            res.status(404)
            throw new Error("product not found");
            
        }
    } catch (error) {
        console.log(error)
      res.status(404).json({error:'server error'})
    }
})

  const fetchAllProducts = asyncHandler(async(req,res)=>{
    try {
        const products = await Product.find({}).populate('category').limit(12).sort({createdAt:-1})
        res.json(products)
    } catch (error) {
        console.log(error)
      res.status(500).json({error:'server error'})
    }
})
  
  const addProductReviews = asyncHandler(async(req,res)=>{
    try {
        const {rating,comment} = req.body;
        const product = await Product.findById(req.params.id)

        if (product) {
            const reviewExist = product.reviews.find((r)=>r.user.toString() === req.user._id.toString())

            if (reviewExist) {
                res.status(400)
                throw new Error("review already exist");   
            }

            const reviews = {
                name:req.user.username,
                comment,
                rating:Number(rating),
                user:req.user._id
            }

            product.reviews.push(reviews)
            product.numReviews = product.reviews.length

            product.rating = product.reviews.reduce((acc,item)=> item.rating + acc ,0)/product.reviews.length

            await product.save()
            res.status(201).json({message:"review added"})
        }else{
            res.status(400)
            throw new Error("Product not found");
            
        }
    } catch (error) {
        console.log(error)
      res.status(500).json({error:'server error'})
    }
})

const fetchTopProduct = asyncHandler(async(req,res)=>{
    try {
        const products = await Product.find({}).sort({rating:-1}).limit(4)
        res.json(products)
    } catch (error) {
        console.log(error)
      res.status(500).json({error:'server error'})
    }
})

const fetchNewProduct = asyncHandler(async(req,res)=>{
    try {
        const products = await Product.find({}).sort({_id:-1}).limit(5)
        res.json(products)
    } catch (error) {
        console.log(error)
      res.status(500).json({error:'server error'})
    }
})
  
const filterProducts = asyncHandler(async(req,res)=>{
  try {
    const {checked,radio} = req.body
    const args = {}
    if (checked.length > 0) args.category = checked
    if (radio.length) args.price = {$gte:radio[0],$lte:radio[1]}
    const products = await Product.find(args)
    res.json(products)
  } catch (error) {
    console.log(error)
    res.status(500).json({error:"server error"})
  }
})


export {addProduct,updateProductDetails,deleteProduct,fetchProducts,getProductById,fetchAllProducts,addProductReviews,fetchTopProduct,fetchNewProduct,filterProducts}