import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { useCreateProductMutation, useUpdateProductImageMutation } from '../../redux/api/productApiSlice'
import { useFetchCategoriesQuery } from '../../redux/api/categoryApiSlice'
import { toast } from 'react-toastify'
import AdminMenu from './AdminMenu'

const ProductList = () => {
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState('')
    const [imageUrl, setImageUrl] = useState(null)
    const [stock, setStock] = useState(0)
    const [brand, setBrand] = useState('')
    const [quantity, setQuantity] = useState('')

    const navigate = useNavigate()

    const [uploadProductImage] = useUpdateProductImageMutation()
    const [createProduct] = useCreateProductMutation()
    const { data: categories } = useFetchCategoriesQuery()

  const uploadImageHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
        const res = await uploadProductImage(formData).unwrap();

        toast.success("Image uploaded successfully");

        // Cloudinary returns URL
        setImage(res.url);
        setImageUrl(res.url);

    } catch (error) {
        toast.error(error?.data?.message || error.message);
    }
};


    const handleSubmit = async(e)=>{
        e.preventDefault()
        try {
            const productData = new FormData()
            productData.append('image',image)
            productData.append('category',category)
            productData.append('description',description)
            productData.append('price',price)
            productData.append('countInStock',stock)
            productData.append('brand',brand)
            productData.append('quantity',quantity)
            productData.append('name',name)

            const {data} = await createProduct(productData)

            if (data.error) {
                toast.error('Product create failed,try again')
            }else{
                toast.success(`${data.name} is created`)
                navigate('/')
            }
        } catch (error) {
            console.log(error)
            toast.error('Product create failed,try again')
        }
    }

    return (
        <div className='container lg:mx-[9rem] sm:mx-[0]'>
            <div className='flex flex-col md:flex-row'>
                <AdminMenu/>
                <div className='md:w-3/4 p-3'>
                    <div className='h-12'>Create Product</div>

                    {imageUrl && (
                        <div className='text-white'>
                            <img src={imageUrl} alt="Product" className='block mx-auto max-h-[200px]' />
                        </div>
                    )}
                    <div className='mb-3'>
                        <label className='border py-11 px-4 rounded-lg text-white text-center w-full block cursor-pointer font-bold'>
                            {image ? "Image Uploaded" : "Upload Image"}
                            <input type="file" onChange={uploadImageHandler} name='image' accept='image/*' className="hidden" />
                        </label>
                    </div>
                    <div className='p-3'>
                        <div className='flex flex-wrap'>
                            <div className='one'>
                                <label htmlFor="name">Name</label> <br />
                                <input type="text" className='p-4 border text-white rounded-lg bg-transparent mb-3 w-[30rem]' value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className='two ml-10'>
                                <label htmlFor="price block">Price</label> <br />
                                <input type="number" className='p-4 border text-white rounded-lg bg-transparent mb-3 w-[30rem]' value={price} onChange={(e) => setPrice(e.target.value)} />
                            </div>
                        </div>
                        <div className='flex flex-wrap'>
                            <div className='three'>
                                <label htmlFor="quantity block">Quantity</label> <br />
                                <input type="number" className='p-4 border text-white rounded-lg bg-transparent mb-3 w-[30rem]' value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                            </div>
                            <div className='four ml-10'>
                                <label htmlFor="brand block">Brand</label> <br />
                                <input type="text" className='p-4 border text-white rounded-lg bg-transparent mb-3 w-[30rem]' value={brand} onChange={(e) => setBrand(e.target.value)} />
                            </div>
                        </div>
                        <label htmlFor="" className='my-5'>Description</label>
                        <textarea className='p-2 mb-3 border bg-transparent text-white rounded-lg w-[95%]' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>

                        <div className='flex justify-between'>
                            <div>
                                <label htmlFor="name block">Count In Stock</label> <br />
                                <input type="text" className='p-4 border text-white rounded-lg bg-transparent mb-3 w-[30rem]' value={stock} onChange={(e) => setStock(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="">Category</label> <br />
                                <select value={category} className='p-4 mb-3 w-[30rem] border rounded-lg bg-black text-white' onChange={(e) => setCategory(e.target.value)}>
                                    <option value="">Choose Category</option>
                                    {categories?.map((c) => (
                                        <option key={c._id} value={c._id}>
                                            {c.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <button onClick={handleSubmit} className='py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-pink-600'>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductList
