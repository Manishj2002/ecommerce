export const addFavoriteToLocalStorage = (product)=>{
const favorites = getFavoriteFromLocalStorage()
  if (!favorites.some((p)=>p._id === product._id)) {
    favorites.push(product)
    localStorage.setItem('favorites',JSON.stringify(favorites))
    
  }
}

export const removeFavoriteFromLocalStorage = (productId)=>{
const favorites = getFavoriteFromLocalStorage()
const updatedFavorites = favorites.filter((p)=>p._id !== productId)

    localStorage.setItem('favorites',JSON.stringify(updatedFavorites))
    
  
}


export const getFavoriteFromLocalStorage = ()=>{
    const favoritesJson = localStorage.getItem('favorites')
    return favoritesJson ? JSON.parse(favoritesJson) : []
}