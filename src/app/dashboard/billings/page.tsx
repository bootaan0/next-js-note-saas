import { StripePortal, StripeSubscriptionCreationButton } from "@/app/components/SubmitButtons";
import prisma from "@/app/lib/db";
import { getStripeSession, stripe } from "@/app/lib/stripe";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { CheckCircle2 } from "lucide-react";
import { redirect } from "next/navigation";

const FetureItems = [
  {name: "Lorem Ipsum Something"},
  {name: "Lorem Ipsum Something"},
  {name: "Lorem Ipsum Something"},
  {name: "Lorem Ipsum Something"},
  {name: "Lorem Ipsum Something"},
]

async function getData(userId: string){
  const data = await prisma.subscription.findUnique({
    where:{
      userId: userId,
    }, 
    select: {
      status: true,
      user:{
        select: {
          stripeCustomerId: true,
        },
      },
    },
  });

  return data;
}

export default async function Billings() {
  const {getUser} = getKindeServerSession()
  const user = await getUser()
  const data =  await getData(user?.id as string)

  async function createSubscription(){
    "use server"

    const dbUser = await prisma.user.findUnique({
      where:{
        id: user?.id,
      },
      select:{
        stripeCustomerId: true,
      },
    });

    if(!dbUser?.stripeCustomerId){
      throw new Error("Unable to get Customer Id")
    }
    const subscriptionUrl = await getStripeSession({
      customerId: dbUser.stripeCustomerId,
      domainUrl: "http://localhost:3000/",
      priceId: process.env.STRIPE_PRICE_ID as string,
    });

    return redirect(subscriptionUrl)
  }

  async function createCustomerPortal(){
    "use server"
    const session = await stripe.billingPortal.sessions.create({
      customer: data?.user.stripeCustomerId as string,
      return_url: "http://localhost:3000/dashboard",
    });

    return redirect(session.url)
  }

  if(data?.status === 'active'){
  return(
    <div className="grid items-start gap-8">
    <div className="flex items-center justify-between px-2">
    <div className="grid gap-1">
    <h1 className="text-3xl md:text-4xl">Subscription</h1>
    <p className="text-lg text-muted-foreground">Settings reagarding your subscription</p>
    </div>
    </div>
    <Card className="w-full lg:w-2/3">
    <CardHeader>
      <CardTitle>Edit subscription</CardTitle>
      <CardDescription>
        Click on the button below, this will give you opportunity 
        to change your payment deatils and view your statement
        at the same time 
      </CardDescription>
    </CardHeader>
    <CardContent>
      <form action={createCustomerPortal}>
        <StripePortal />
      </form>
    </CardContent>
    </Card>
    
    </div>
  );
  }

  return (
    <div className="max-w-md mx-auto space-y-4">
    <Card className="flex flex-col">
    <CardContent className="py-8">
    <div>
        <h3 className="inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide text-primary bg-primary/10 uppercase">Monthly</h3>
    </div>

    <div className="mt-4 flex items-baseline text-4xl font-extrabold">
      30$ <span className="ml-1 text-2xl text-muted-foreground">/mo</span>
    </div>
    <p className="mt-5 text-lg text-muted-foreground">Write many notes as you want $30 a month</p>
    </CardContent>
    <div className="flex-1 flex flex-col justify-between px-6 pt-6 pb-8 bg-secondary rounded-lg space-y-6 sm:p-10 sm:pt-6">
      <ul className="space-y-4">
        {FetureItems.map((item, index) => (
          <li key={index} className="flex items-center">
             <div className="flex-shrink-0">
              <CheckCircle2 className="h-6 w-6 text-green-500"/>
             </div>
             <p className="ml-3 text-base">{item.name}</p>
          </li>
        ))}
      </ul>
      <form action={createSubscription}>
        <StripeSubscriptionCreationButton />
      </form>

    </div>
    </Card>
      
    </div>
  )
}
