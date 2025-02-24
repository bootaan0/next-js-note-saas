import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { XIcon } from "lucide-react";
import Link from "next/link";


export default function  CancelRoute(){
    return(
        <div className="w-full min-h-[80vh] flex items-center justify-center">
        <Card className="w-[350px]">
        <div className="p-6">
        <div className="w-full flex justify-center">
            <XIcon className="w-12 h-12 rounded-full bg-red-500/30 text-red-500" />
        </div>

        <div className="mt-3 text-center sm:mt-5 w-full">
        <h3 className="text-lg leading-5 font-medium ">Payment failed</h3>
        <div className="mt-3">
        <p className="text-sm text-muted-foreground">Don't worries. you won't be charge please try again.</p>
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