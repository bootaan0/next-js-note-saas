import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, XIcon } from "lucide-react";
import Link from "next/link";


export default function  SuccessRoute(){
    return(
        <div className="w-full min-h-[80vh] flex items-center justify-center">
        <Card className="w-[350px]">
        <div className="p-6">
        <div className="w-full flex justify-center">
            <Check className="w-12 h-12 rounded-full bg-green-500/30 text-green-500" />
        </div>

        <div className="mt-3 text-center sm:mt-5 w-full">
        <h3 className="text-lg leading-5 font-medium ">Payment Successfull</h3>
        <div className="mt-3">
        <p className="text-sm text-muted-foreground">
            Congrats on your susbcription. please check your email instruction</p>
        </div>
        <div className="mt-5 sm:mt-6 w-full">
            <Button asChild className="w-full"> 
                <Link href="/dashboard">Go back to dashboard</Link>
            </Button>
        </div>
        </div>

        </div>

        </Card>
        
        </div>
    )
}