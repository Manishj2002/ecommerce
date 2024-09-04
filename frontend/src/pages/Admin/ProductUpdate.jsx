import React, { useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import {
  useDeleteProductMutation,
  useUpdateProductMutation,
  useGetProductByIdQuery,
  useUpdateProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";

const ProductUpdate = () => {
  const params = useParams();
  const { data: productData } = useGetProductByIdQuery(params._id);
  const [name, setName] = useState(productData?.name || "");
  const [category, setCategory] = useState(productData?.category || "");
  const [description, setDescription] = useState(
    productData?.description || ""
  );
  const [price, setPrice] = useState(productData?.price || "");
  const [image, setImage] = useState(productData?.image || "");
  const [stock, setStock] = useState(productData?.countInStock);
  const [brand, setBrand] = useState(productData?.brand || "");
  const [quantity, setQuantity] = useState(productData?.quantity || "");

  const navigate = useNavigate();

  const [uploadProductImage] = useUpdateProductImageMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const { data: categories = [] } = useFetchCategoriesQuery();

  useEffect(() => {
    if (productData && productData._id) {
      setName(productData.name);
      setCategory(productData.category);
      setDescription(productData.description);
      setPrice(productData.price);
      setImage(productData.image);
      setStock(productData.stock);
      setBrand(productData.brand);
      setQuantity(productData.quantity);
    }
  }, [productData]);


  const uploadImageHandler = async (e) => {
    const formData = new FormData()
    formData.append('image', e.target.files[0])

    try {
        const res = await uploadProductImage(formData).unwrap()
        toast.success("item added successfully")
        setImage(res.image)
    } catch (error) {
        toast.error(error?.data?.message || error.message)
    }
}

const handleSubmit = async(e)=>{
    e.preventDefault()
    try {
        const formData = new FormData()
        formData.append('image',image)
        formData.append('category',category)
        formData.append('description',description)
        formData.append('price',price)
        formData.append('stock',stock)
        formData.append('brand',brand)
        formData.append('quantity',quantity)
        formData.append('name',name)

        const {data} = await updateProduct({productId:params._id,formData})

        if (data.error) {
            toast.error(data.error)
        }else{
            toast.success(`Product Successfully updated`)
            navigate('/admin/allproductslist')
        }
    } catch (error) {
        console.log(error)
        toast.error('Product update failed,try again')
    }
}


const handleDelete = async(e)=>{
    try {
       const answer = window.confirm('Are you sure you want to delete this product')
       if (!answer) return;

       const {data} = await deleteProduct(params._id)
       toast.success(`${data.name} is deleted`)
       navigate('/admin/allproductslist')

    } catch (error) {
        console.log(error)
        toast.error('Delete failed,try again')
    }
}


  return (
    <div className="container lg:mx-[9rem] sm:mx-[0]">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <div className="md:w-3/4 p-3">
          <div className="h-12">Create Product</div>

          {image && (
                <div className='text-white'>
                    <img src={image} alt="Product" className='block mx-auto max-h-[200px]' />
                </div>
            )}
          <div className="mb-3">
            <label className="border py-11 px-4 rounded-lg text-white text-center w-full block cursor-pointer font-bold">
              {image ? "Image Uploaded" : "Upload Image"}
              <input type="file"
               onChange={uploadImageHandler} 
               name='image' accept='image/*' className="hidden" />
            </label>
          </div>
          <div className="p-3">
            <div className="flex flex-wrap">
              <div className="one">
                <label htmlFor="name">Name</label> <br />
                <input
                  type="text"
                  className="p-4 border text-white rounded-lg bg-transparent mb-3 w-[30rem]"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="two ml-10">
                <label htmlFor="price block">Price</label> <br />
                <input
                  type="number"
                  className="p-4 border text-white rounded-lg bg-transparent mb-3 w-[30rem]"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="three">
                <label htmlFor="quantity block">Quantity</label> <br />
                <input
                  type="number"
                  className="p-4 border text-white rounded-lg bg-transparent mb-3 w-[30rem]"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="four ml-10">
                <label htmlFor="brand block">Brand</label> <br />
                <input
                  type="text"
                  className="p-4 border text-white rounded-lg bg-transparent mb-3 w-[30rem]"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>
            </div>
            <label htmlFor="" className="my-5">
              Description
            </label>
            <textarea
              className="p-2 mb-3 bg-transparent border text-white rounded-lg w-[95%]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <div className="flex justify-between">
              <div>
                <label htmlFor="stock block">Count In Stock</label> <br />
                <input
                  type="text"
                  className="p-4 border text-white rounded-lg bg-transparent mb-3 w-[30rem]"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="">Category</label> <br />
                <select
                  value={category}
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#141414] text-white"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Choose Category</option>
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
           <div>
           <button
               onClick={handleSubmit}
              className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-green-600"
            >
              Submit
            </button>
           <button
               onClick={handleDelete}
              className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-pink-600"
            >
              Delete
            </button>
           </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
