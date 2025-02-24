import { NewNoteSubmitButtons } from "@/app/components/SubmitButtons";
import prisma from "@/app/lib/db";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";


export default async function NewNoteRoute(){
 const {getUser} = getKindeServerSession()
const user = await getUser()
    async function postData(formData: FormData){
        "use server"
        if(!user){
            throw new Error("Not authorizes")
        }

        const title = formData.get("title") as string;
        const description = formData.get("description") as string;

        await prisma.note.create({
            data:{
                userId: user.id,
                description: description,
                title: title,
            },
        });

        return redirect("/dashboard")

    }

    return(
        <div>
            <Card>
            <form action={postData}>
           <CardHeader>
           <CardTitle>New Note</CardTitle>
            <CardDescription>
                Right here you can create new note
            </CardDescription>
           </CardHeader>
           <CardContent className="flex flex-col gap-y-5">
            <div className="flex flex-col gap-y-2">
            <Label>Title</Label>
            <Input required type="text" name="title" placeholder="title for your note"/>
            </div>
            <div className="flex flex-col gap-y-2">
            <Label>Description</Label>
            <Textarea required  name="description" placeholder="description"/>
            </div>
           </CardContent>
           <CardFooter className="flex justify-between">
           <Button asChild variant={"destructive"}> 
           <Link href="/dashboard">Cancel</Link>
           </Button>
           <NewNoteSubmitButtons />
           </CardFooter>
            </form>
            </Card>
        </div>
    )

}