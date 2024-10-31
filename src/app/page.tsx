import { Button } from "@/components/ui/button";
import {RegisterLink} from "@kinde-oss/kinde-auth-nextjs/components";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const {isAuthenticated} = getKindeServerSession()

  if(await isAuthenticated()){
    return redirect("/dashboard")
  }
  return (
   <section className="flex items-center justify-center bg-background h-[90vh]">
    <div className="relative items-center mx-auto max-w-7xl w-full px-5 py-12 lg:px-16 md:px-12">
      <div className="max-w-3xl mx-auto text-center">
      <div className="">
        <span className="w-auto px-6 py-3 rounded-full bg-secondary">
          <span className="text-sm font-medium text-primary">Sort your notes easlly</span>
        </span>
        <h1 className="mt-8 font-extrabold lg:text-5xl tracking-tighter">Create notes easy</h1>
        <p className="max-w-xl mx-auto mt-8 text-base lg:text-xl text-secondary-foreground"> 
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam atque, nobis tempore id, provident adipisci aliquid quam 
         </p>
      </div>
      <div className="flex justify-center max-w-sm mx-auto mt-10">
        <RegisterLink>
        <Button size='lg' className="w-full">Sign up for free</Button> </RegisterLink>
      </div>
      </div>
    </div>
   </section>
  );
}
