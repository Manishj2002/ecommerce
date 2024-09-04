import React from 'react'
import { useParams } from 'react-router'
import { useGetProductsQuery } from '../redux/api/productApiSlice';
import Header from '../components/Header';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Link } from 'react-router-dom';
import Product from './Products/Product';

const Home = () => {
    const {keyword} = useParams();
    const {data, isError, isLoading}= useGetProductsQuery({keyword})
  return (
    <>
    {!keyword? <Header/>:null}
    {isLoading ? (<Loader/>) : isError ? (<Message variant='danger'>{isError?.data.message || isError.error}</Message>) : (
      <>
       <div className='flex justify-center items-center'>
        <h1 className='ml-[20rem] mt-[10rem] text-[3rem]'>Special Product</h1>

        <Link to='/shop' className='bg-pink-800 font-bold px-10 py-2 mr-[18rem] rounded-full mt-[10rem]'>
               Shop
              </Link>
       </div>
       <div className='flex justify-center flex-wrap mt-[2rem]'>
        {data.products.map((product)=>(
          <div key={product._id}>
            <Product product={product}/>
          </div>
        ))}

       </div>
      </>
    )}
    </>
  )
}

export default Home