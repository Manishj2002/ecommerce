import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
    name:"favorites",
    initialState:[],
    reducers:{
        addToFavorite:(state,action)=>{
            if (!state.some((product)=> product._id === action.payload._id)) {
                state.push(action.payload)
            }
        },
        removeFromFavorite:(state,action)=>{
            return state.filter((product)=>product._id !== action.payload._id)
        },
        setFavorites:(state,action)=>{
            return action.payload
        }
    }
})


export const {addToFavorite,removeFromFavorite,setFavorites} = favoriteSlice.actions

export const selectFavouriteProduct = (state)=>state.favorites

export default favoriteSlice.reducer;

