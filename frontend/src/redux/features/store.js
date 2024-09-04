import {configureStore} from '@reduxjs/toolkit'
import { apiSlice } from '../api/apiSlice'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import authReducer from './auth/authSlice'
import cartReducer from './cart/cartSlice'
import shopReducer from './shop/shopSlice'
import favouriteReducer from './favourite/favouriteSlice'
import { getFavoriteFromLocalStorage } from '../../Utils/localStorage'

const initalFavorites = getFavoriteFromLocalStorage() || []

export const store = configureStore({
    reducer:{
        [apiSlice.reducerPath] : apiSlice.reducer,
        auth:authReducer,
        favorites:favouriteReducer,
        cart:cartReducer,
        shop:shopReducer
    },
      preloadedState:{
        favorites:initalFavorites
      }          ,

    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(apiSlice.middleware),

    devTools:true

})

setupListeners(store.dispatch)

export default store