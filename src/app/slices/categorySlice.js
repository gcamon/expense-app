import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categories: [],
    category: null,
    type: ""
}


export const categorySlice = createSlice({
    name: "categories",
    initialState,
    reducers: {      
        setCategories: (state,action) => {
            state.categories = action.payload;
        },
        setCategory: (state,action) => {
            state.categories.push(action.payload)
        },  
        setType: (state,action) => {
            state.type = action.payload;
        },  
    }
});

export const {    
    setCategories,
    setCategory,
    setType

} = categorySlice.actions;


export const selectCategories = (state) => state.categories.categories;
export const selectCategory = (state) => state.categories.category;
export const selectType = (state) => state.categories.type;




export default categorySlice.reducer;