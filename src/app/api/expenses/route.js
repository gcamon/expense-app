import { NextResponse } from "next/server"
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const GET = async (req) => {
    try{        
        
        //const session = await getServerSession(authOptions);
        console.log(req.query.id)
        const expenses = await db.expenses.findMany({
            where: {categoryId: req.query.id}
        })

        return NextResponse.json({expenses: expenses, message: "User expenses"}, {status: 201})
    } catch(err) {
        return NextResponse.json({message: "Oops! Something went wrong"}, {status: 500})
    }
}


export const POST = async (req) => {
    try {
       
        const session = await getServerSession(authOptions)
        const body = await req.json();


        const {name, amount, categoryId} = body;

        // Check if email already exist
        const existingUser = await db.user.findFirst({
            where: {email: session?.user.email}
        });
        
        if(existingUser){
            const newCategory = await db.category.findFirst({
                where: {categoryId: categoryId}
            })

            const newExpense = await db.expenses.create({
                data: {
                    name,
                    amount,
                    categoryId: newCategory.id,
                    userId: existingUser.id,
                    trackId: existingUser.id
                }
            })
            return NextResponse.json({expense: newExpense, message: "Expense created successfulyy"}, {status: 201})
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