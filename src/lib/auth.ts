import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "./db";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {  
    adapter: PrismaAdapter(db),
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: '/sign-in'
    },
    secret: process.env.NEXTAUTH_URL,
    providers: [
        CredentialsProvider({
            name: 'Credentials',           
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials): Promise<any> {                

                if(!credentials?.email || !credentials?.password){
                    return null;
                }

                const existingUser = await db.user.findUnique({
                    where: { email: credentials?.email }
                })

                if(!existingUser){
                    return null;
                }

                const passwordMatch = existingUser.password ? await compare(credentials.password, existingUser.password) : null;

                if(!passwordMatch){
                    return null;
                }

                return {
                    id: `${existingUser.id}`,
                    email: existingUser.email,
                    username: existingUser.username
                } 

            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if(user) {
                return {
                    ...token,
                    username: user.username
                }
            }
            return token
        },
        async session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    username: token.username
                }
            }
        }
    }
    
}