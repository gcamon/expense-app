import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

 const Home = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div>
        <h1 className='text-4xl'>Welcome To Brydge Expense Tracker Application.</h1>
        { !session 
        ?
        <div className="mt-4">
          <h4>Please <Link href='/sign-in' className="text-blue-600">Sign in </Link> to manage your expenses</h4>
          <h4>If you don't have an account <Link href="/sign-up" className="text-blue-600">Sign up</Link></h4>
        </div>
        :
        <div className="mt-4">
            <h4>Go back to <Link href="/admin" className="text-blue-600">Admin Dashboard</Link></h4>
        </div>
        }
    </div>  
  )
}

export default Home
