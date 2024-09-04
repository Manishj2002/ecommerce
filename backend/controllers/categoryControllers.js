import asyncHandler from "../middlewares/asyncHandler.js";
import Category from "../models/categoryModels.js";

const createCategory = asyncHandler(async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.json({ error: "name is required" })
        }

        const existingName = await Category.findOne({ name })

        if (existingName) {
            return res.json({ error: "category already exist" })
        }


        const newCategory = await new Category({ name }).save()

        res.json(newCategory)
    } catch (error) {
        console.log(error.message)
        return res.status(400).json({ error: error.message })
    }
})

const updateCategory = asyncHandler(async (req, res) => {
    try {
        const { name } = req.body;
        const { categoryId } = req.params;


        const category = await Category.findOne({ _id: categoryId })

        if (!category) {
            return res.status(401).json({ error: "category does not exist" })
        }


        category.name = name

        const updatedCategory = await category.save()

        res.json(updatedCategory)
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ error: 'internal server error' })
    }
})

const removeCategory = asyncHandler(async (req, res) => {
    try {

        const removed = await Category.findByIdAndDelete(req.params.categoryId);


        res.json(removed)
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ error: 'internal server error' })
    }
})
const listCategories = asyncHandler(async (req, res) => {
    try {

        const all = await Category.find({});
        res.json(all)
    } catch (error) {
        console.log(error)
        return res.status(400).json(error.message)
    }
})
const readCategory = asyncHandler(async (req, res) => {
    try {

        const category = await Category.findById(req.params.id);
        res.json(category)
    } catch (error) {
        console.log(error)
        return res.status(400).json(error.message)
    }
})

export { createCategory, updateCategory, removeCategory, listCategories,readCategory }