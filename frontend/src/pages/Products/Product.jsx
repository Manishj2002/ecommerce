import React from 'react'
import { Link } from 'react-router-dom'
import HeartIcon from './HeartIcon'

const Product = ({product}) => {
  return (
    <div className='w-[20rem] ml-[2rem] p-3 relative'>
    <div className='relative'>
        <img src={product.image} alt={product.name} className='w-[30rem] rounded' />
        <HeartIcon product={product}/>
        <div className='p-4'>
            <Link to={`/product/${product._id}`}>
             <h2 className='flex justify-between items-center'>
                <div>{product.name}</div>
                <span className='bg-pink-100 text-pink-800 text-sm font-medium mr-2 px-2.5 py-0.5 dark:bg-pink-800 dark:text-pink-300 rounded-full'>$ {product.price}</span>
             </h2>
            </Link>
        </div>
    </div>
</div>
  )
}

export default Product