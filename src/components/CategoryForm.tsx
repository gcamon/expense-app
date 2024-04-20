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
import { selectType, setCategories, setCategory, setType, selectCategories, setExpenses } from "@/app/slices/categorySlice";
import { FormSelect } from "react-bootstrap";



const CategoryForm = () => {

const [isLoading, setIsLoading] = useState(false);

const [cates, setCates] = useState([])

const dispatch = useDispatch();

const typeOfForm = useSelector(selectType)



const FormSchema = z
  .object({
    title: z.string().min(1, 'Category is required').max(100),
    budget: z.coerce.number().int(),
    limit: z.coerce.number().int()
  })

const FormSchema2 = z
  .object({
    name: z.string().min(1, 'Category is required').max(100),
    amount: z.coerce.number().int(),
    category: z.string().min(1, 'Category is required').max(100)
})

const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: '',
      budget: 0,
      limit: 0,
    },
});

const form2 = useForm<z.infer<typeof FormSchema2>>({
  resolver: zodResolver(FormSchema2),
  defaultValues: {
    name: '',
    amount: 0,
    category: "",
  },
});

useEffect(() => {
    const getCategories = async () => {
        try {
            const response = await fetch("/api/category")
    
            if(response.ok){
                const data = await response.json();
                setCates(data.categories)
                dispatch(setCategories(data.categories))
            } else {
              alert("Something went wrong while posting data")
            }
        } catch(err) {
          alert("Error occured while fetching categories")
        }

        dispatch(setType('Category'))
    }

    getCategories();
    
}, [dispatch])



const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    try{
       setIsLoading(true);
       const response = await fetch("/api/category")

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

 const onSubmitExpense = async (values: z.infer<typeof FormSchema2>) => {
  try{
     setIsLoading(true);
     const response = await fetch("/api/expenses", {
       method: "POST",
       headers: {
         "Content-Type": "application/json"
       },
       body: JSON.stringify({
         name: values.name,
         amount: values.amount,
         category: values.category
       })
     })

     if(response.ok){
      setIsLoading(false);
       const data = await response.json();
       dispatch(setExpenses(data.expense))
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

const handleChange = async (id: any) => {
    try{
      const url = `/api/expenses/?id=${id}`;
      const categoryExpenses = await fetch(url)
      const data = await categoryExpenses.json();
      console.log(data)
      return;
      dispatch(setExpenses(data.expenses))
    } catch(err){
      alert("error fetching expense category")
    }
}


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
    { typeOfForm === "Category" ? 
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
                    <Input placeholder='e.g Food' {...field} />
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
      :
      <Form {...form2}>
        <form className='w-full' onSubmit={form2.handleSubmit(onSubmitExpense)}>
          <div className='space-y-2'>
            <FormField
              control={form2.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Food' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form2.control}
              name='amount'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input placeholder='1000' {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form2.control}
              name='category'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormSelect onChange={(e) => handleChange(e.target.value)}>
                    { cates.map((category: any) => (
                      <option id={category.id} value={category.id} className="text-blue">{category.title}</option>
                    ))
                    }
                  </FormSelect>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button className='w-full mt-6' type='submit'>
          { isLoading ? "Adding..." : "Add"}
          </Button>
        </form>
      
      </Form>
    }
    </div>
  );
};

export default CategoryForm;
