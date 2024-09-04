import React from 'react'
import { FaRegStar, FaStar, FaStarHalf } from 'react-icons/fa'

const Ratings = ({value,text,color}) => {
  const fullStars = Math.floor(value)
  const halfstars = value - fullStars > 0.5 ? 1 : 0
  const emptyStars = 5 - fullStars - halfstars
    
  return (
    <div className='flex items-center'>
      {[...Array(fullStars)].map((_,index)=>(
        <FaStar key={index} className={`text-${color} ml-1`}/>
      ))}
      {halfstars === 1 && <FaStarHalf className={`text-${color} ml-1`}/>}
      {[...Array(emptyStars)].map((_,index)=>(
        <FaRegStar key={index} className={`text-${color} ml-1`}/>
      ))}

      <span className={`text-${color} ml-[2rem] rating-text`}>
        {text && text}
      </span>
    </div>
  )
}

Ratings.defaultProps = {
  color:"yellow-500"
}

export default Ratings