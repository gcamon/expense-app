import { NextResponse } from "next/server"
import { db } from "@/lib/db";
import { hash } from "bcrypt";
import * as z from "zod"
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const GET = async (req) => {
    try{        
        // Check if email already exist
        const session = await getServerSession(authOptions);
        
        const existingUser = await db.user.findFirst({
            where: {email: session?.user.email}
        });

        console.log(existingUser)

        const categories = await db.category.findMany({
            where: {userId: existingUser.id}
        })

        return NextResponse.json({categories: categories, message: "User Categories"}, {status: 201})
    } catch(err) {
        return NextResponse.json({message: "Oops! Something went wrong"}, {status: 500})
    }
}


export const POST = async (req) => {
    try {
       
        const session = await getServerSession(authOptions)
        const body = await req.json();


        const {title, limit, budget} = body;

        // Check if email already exist
        const existingUser = await db.user.findFirst({
            where: {email: session?.user.email}
        });
        
        if(existingUser){
            const newCategory = await db.category.create({
                data: {
                    title,
                    limit,
                    budget, 
                    userId: existingUser.id
                }
            })
            return NextResponse.json({category: newCategory, message: "Category created successfulyy"}, {status: 201})
        } else {
            return NextResponse.json({
                status: false, 
                message: "User already exist."
            }, {status: 409});
        }

    } catch(err) {
        console.log(err)
        return NextResponse.json({message: "Oops! Something went wrong"}, {status: 500})
    }
}