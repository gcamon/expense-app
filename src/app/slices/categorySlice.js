import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categories: [],
    category: null,
    type: "",
    expenses: []
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
        setExpenses: (state,action) => {
            state.expenses = action.payload;
        },  
    }
});

export const {    
    setCategories,
    setCategory,
    setType,
    setExpenses
} = categorySlice.actions;


export const selectCategories = (state) => state.categories.categories;
export const selectCategory = (state) => state.categories.category;
export const selectType = (state) => state.categories.type;
export const selectExpenses = (state) => state.categories.expenses;




export default categorySlice.reducer;