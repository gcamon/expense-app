"use client";
import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from './ui/form';

import { Button } from './ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from './ui/input';
import { useDispatch, useSelector } from "react-redux";
import { selectType, setCategories, setCategory, setType } from "@/app/slices/categorySlice";



const CategoryForm = () => {

const [isLoading, setIsLoading] = useState(false);

const dispatch = useDispatch();
const typeOfForm = useSelector(selectType)

const FormSchema = z
  .object({
    title: z.string().min(1, 'Category is required').max(100),
    budget: z.coerce.number().int(),
    limit: z.coerce.number().int()
  })


  
const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: '',
      budget: 0,
      limit: 0,
    },
});

useEffect(() => {
    const getCategories = async () => {
        try {
            const response = await fetch("/api/category")
    
            if(response.ok){
                const data = await response.json();
                dispatch(setCategories(data.categories))
            } else {
    
            }
        } catch(err) {
            alert("Error occured while fetching categories")
        }
    }

    getCategories();
    dispatch(setType('Category'))
}, [])


const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    try{
       setIsLoading(true);
       const response = await fetch("/api/category", {
         method: "POST",
         headers: {
           "Content-Type": "application/json"
         },
         body: JSON.stringify({
           title: values.title,
           limit: values.limit,
           budget: values.budget
         })
       })

       if(response.ok){
        setIsLoading(false);
         const data = await response.json();
         dispatch(setCategory(data.category))
       } else {
        setIsLoading(false);
         alert("Categroy creation failed!")
       }
    } 
    catch(err){
        setIsLoading(false);
       alert("Something went wrong while posting your details. Please try again.")
    }
 };


  return (
    <div className="w-1/3">
        <div className="flex gap-1">
            <Button className="w-1/2" variant={"outline"} onClick={() => dispatch(setType('Category'))}>
                Category
            </Button>
            <Button className='w-1/2' variant={"outline"} onClick={() => dispatch(setType("Expenses"))}>
                Expenses
            </Button>
        </div>
        <hr/>
    <h4 className="py-4 font-semibold">Add {typeOfForm === "Category" ? "Category" : "Expenses"}</h4>
    <Form {...form}>
      <form className='w-full' onSubmit={form.handleSubmit(onSubmit)}>
        <div className='space-y-2'>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category name</FormLabel>
                <FormControl>
                  <Input placeholder='Food' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='budget'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Budget</FormLabel>
                <FormControl>
                  <Input placeholder='1000' {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='limit'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Limit</FormLabel>
                <FormControl>
                  <Input placeholder='1000' {...field} type="number"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className='w-full mt-6' type='submit'>
        { isLoading ? "Adding..." : "Create"}
        </Button>
      </form>
     
    </Form>
    </div>
  );
};

export default CategoryForm;
