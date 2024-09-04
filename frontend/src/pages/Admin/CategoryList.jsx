import React, { useState } from 'react'
import {toast} from 'react-toastify'
import { useCreateCategoryMutation, useDeleteCategoryMutation, useFetchCategoriesQuery, useUpdateCategoryMutation } from '../../redux/api/categoryApiSlice'
import CategoryForm from '../../components/CategoryForm'
import Model from '../../components/Model'
import AdminMenu from './AdminMenu'

const CategoryList = () => {
    const {data:categories} = useFetchCategoriesQuery()
    const [name, setName] = useState('')
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [updateName, setUpdateName] = useState('')
    const [modelVisible, setmodelVisible] = useState(false)


    const [createCategory] = useCreateCategoryMutation()
    const [updateCategory] = useUpdateCategoryMutation()
    const [deleteCategory] = useDeleteCategoryMutation()

    const handleCreateCategory = async(e)=>{
        e.preventDefault()
        if (!name) {
            toast.error('Category name is required')
            return
        }

        try {
            const result = await createCategory({name}).unwrap()
            if (result.error) {
                toast.error(result.error)
            }else{
                setName("")
                toast.success(`${result.name} is created successfully`)
            }

        } catch (error) {
            console.log(error)
            toast.error('Creating category failed,try again')
        }
    }
    const handleUpdateCategory = async(e)=>{
        e.preventDefault()
        if (!updateName) {
            toast.error('Category name is required')
            return
        }

        try {
            const result = await updateCategory({categoryId:selectedCategory._id,updateCategory:{name:updateName}}).unwrap()
            if (result.error) {
                toast.error(result.error)
            }else{
                toast.success(`${result.name} is updated successfully`)
                setUpdateName("")
                setmodelVisible(false)
                setSelectedCategory(null)
            }

        } catch (error) {
            console.log(error)
            toast.error('Creating category failed,try again')
        }
    }
    const handleDeleteCategory = async(e)=>{
        e.preventDefault()
        try {
            const result = await deleteCategory({categoryId:selectedCategory._id}).unwrap()
            if (result.error) {
                toast.error(result.error)
            }else{
                toast.success(`${result.name} is deleted`)
                setmodelVisible(false)
                setSelectedCategory(null)
            }

        } catch (error) {
            console.log(error)
            toast.error('Category detecting failed,try again')
        }
    }

  return (
    <div className='ml-[10rem] flex flex-col md:flex-row'>
        <AdminMenu/>
        <div className='md:w-3/4 p-3'>
            <div className='h-12'>Manage Categories</div>
            <CategoryForm value={name} setValue={setName} handleSubmit={handleCreateCategory}/>
            <br />
            <hr />
            <div className='flex flex-wrap gap-5 mt-3'>
                {categories?.map((category)=>(
                    <div key={category._id}>
                         <button className='bg-transparent border border-pink-500  py-2 px-4 rounded-lg hover:text-white m-3 text-pink-500 hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50' onClick={()=>{{
                            setmodelVisible(true)
                            setSelectedCategory(category)
                            setUpdateName(category.name)
                         }}}>{category.name}</button>
                    </div>
                ))}
            </div>

            <Model isOpen={modelVisible} onClose={()=>setmodelVisible(false)}>
            <CategoryForm value={updateName} setValue={(value)=>setUpdateName(value)} handleSubmit={handleUpdateCategory} buttonText='Update' handleDelete={handleDeleteCategory}/>
            </Model>
        </div>
    </div>
  )
}

export default CategoryList