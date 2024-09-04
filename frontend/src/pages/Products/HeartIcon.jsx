import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addFavoriteToLocalStorage, getFavoriteFromLocalStorage, removeFavoriteFromLocalStorage } from '../../Utils/localStorage'
import { addToFavorite, removeFromFavorite, setFavorites } from '../../redux/features/favourite/favouriteSlice'
import { FaHeart, FaRegHeart } from 'react-icons/fa'

const HeartIcon = ({product}) => {
    const dispatch = useDispatch()
    const favorites = useSelector(state => state.favorites)
    const isFavorites = favorites.some((p)=>p._id === product._id)

    useEffect(() => {
      const favoritesFromLocalStorage = getFavoriteFromLocalStorage()
      dispatch(setFavorites(favoritesFromLocalStorage))
    }, [])

    const toggleFavorite = ()=>{
        if (isFavorites) {
            dispatch(removeFromFavorite(product))
            removeFavoriteFromLocalStorage(product._id)
        }else{
            dispatch(addToFavorite(product))
            addFavoriteToLocalStorage(product)
        }
    }
    
  return (
    <div onClick={toggleFavorite} className='absolute top-2 right-5 cursor-pointer'>
        {isFavorites ? (<FaHeart className='text-pink-700'/>) : (<FaRegHeart className='text-white'/>)}
    </div>
  )
}

export default HeartIcon