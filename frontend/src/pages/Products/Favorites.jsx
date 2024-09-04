import React from 'react'
import { useSelector } from 'react-redux'
import { selectFavouriteProduct } from '../../redux/features/favourite/favouriteSlice'
import Product from './Product'

const Favorites = () => {
    const favorites = useSelector(selectFavouriteProduct)

  return (
    <div className='ml-[10rem]'>
        <h1 className='font-bold ml-[3rem] mt-[3rem] text-lg '>
            FAVORITE PRODUCTS
        </h1>
        <div className='flex flex-wrap'>
            {favorites.map((product)=>(
                <Product product={product}/>
            ))}
        </div>
    </div>
  )
}

export default Favorites