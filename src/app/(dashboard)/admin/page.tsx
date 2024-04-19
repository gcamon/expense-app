import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import CategoryForm from "@/components/CategoryForm";
import CategoryList from "@/components/CategoryList";


const page = async () => {
  const session = await getServerSession(authOptions)

  return (
    <div
      className="p-4 flex container justify-center"
      style={{border: "1px solid red"}}
    >
      <CategoryForm />
      <CategoryList /> 
    </div>
  );
}

export default page

