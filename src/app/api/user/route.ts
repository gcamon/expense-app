import { NextResponse } from "next/server"
import { db } from "@/lib/db";
import { hash } from "bcrypt";
import * as z from "zod"


const userSchema = z
  .object({
    username: z.string().min(1, 'Username is required').max(100),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have than 8 characters'),
  })

export const POST = async (req: Request) => {
    try {

        const body = await req.json();
        const {email, username, password} = userSchema.parse(body)

        // Check if email already exist
        const existingUserEmail = await db.user.findUnique({
            where: {email: email}
        });
        
        if(existingUserEmail){
            return NextResponse.json({
                user: null, 
                message: "User with this email already exist!"
            }, {status: 409});
        }

       // Check if email already exist
        const existingUserUsername = await db.user.findUnique({
            where: {username: username}
        });

        if(existingUserUsername){
            return NextResponse.json({
                user: null, 
                message: "User with this username exist!"
            }, {status: 409});
        }

        const hashPassword = await hash(password, 10);

        const newUser = await db.user.create({
            data: {
                username,
                email,
                password: hashPassword,
            }
        })

        const {password: newUsersPassword, ...info} = newUser;

        return NextResponse.json({user: info, message: "User created successfulyy"}, {status: 201})

    } catch(err) {
        console.log(err)
        return NextResponse.json({message: "Oops! Something went wrong"}, {status: 500})
    }
}