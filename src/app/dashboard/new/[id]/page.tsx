
import { NewNoteSubmitButtons } from "@/app/components/SubmitButtons";
import prisma from "@/app/lib/db";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";

async function getData({userId, noteId}: {userId: string; noteId: string}){
    const data = await prisma.note.findUnique({
        where:{
            id: noteId,
            userId: userId,
        },
        select:{
            title: true,
            description: true,
            id: true,
        },
    });
    return data;
}




export default async function DynamicRouteId({params}: {params: {id: string}}) {
  const {getUser} = getKindeServerSession()
  const user = await getUser()
  const data =  await getData({userId: user?.id as string, noteId: params.id})

  async function postData(formData: FormData){
    "use server"
    if(!user){
        throw new Error("Not authorizes")
    }

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

   await prisma.note.update({
    where:{
        id: data?.id,
        userId: user.id,
    },
    data:{
        description: description,
        title: title,
    },
   });

   revalidatePath("/dashboard")
   return redirect("/dashboard")

}


    return(
        <div>
            <Card>
            <form action={postData}>
           <CardHeader>
           <CardTitle>Edit Note</CardTitle>
            <CardDescription>
                Right here you can edit your note
            </CardDescription>
           </CardHeader>
           <CardContent className="flex flex-col gap-y-5">
            <div className="flex flex-col gap-y-2">
            <Label>Title</Label>
            <Input required type="text" name="title" placeholder="title for your note" 
             defaultValue={data?.title} />
            </div>
            <div className="flex flex-col gap-y-2">
            <Label>Description</Label>
            <Textarea required  name="description" placeholder="description" 
            defaultValue={data?.description}/>
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
