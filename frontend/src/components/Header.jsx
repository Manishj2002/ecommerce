import React from 'react'
import { useGetTopProductQuery } from '../redux/api/productApiSlice'
import SmallProduct from '../pages/Products/SmallProduct'
import ProductCarousel from '../pages/Products/ProductCarousel'

const Header = () => {
    const {data,isError,isLoading} = useGetTopProductQuery()
  return (
    <>
    <div className='flex justify-around'>
        <div className='xl:block lg:hidden md:hidden sm:hidden'>
            <div className='grid grid-cols-2'>
                {data?.map((product)=>(
                    <div key={product._id}>
                        <SmallProduct  product={product}/>
                    </div>
                ))}
            </div>
        </div>
        <ProductCarousel/>
    </div>
    </>
  )
}

export default Header