"use client"
import { configureStore } from '@reduxjs/toolkit'

import categorySlice from './app/slices/categorySlice.js';


export const store = configureStore({
  reducer: {
    categories: categorySlice
  },
})

