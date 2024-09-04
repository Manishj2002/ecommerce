import React from 'react'
import { useSelector } from 'react-redux'

const FavoriteCounts = () => {
    const favorites = useSelector(state=>state.favorites)
    const favoritesCountes = favorites.length
  return (
    <div className='absolute top-8 left-2'>
        {favoritesCountes>0 && (
            <span className='bg-pink-600 text-white text-sm px-1 py-0 rounded-full'>{favoritesCountes}</span>
        )}
    </div>
  )
}

export default FavoriteCounts