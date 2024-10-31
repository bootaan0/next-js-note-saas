"use client"
import { Button } from "@/components/ui/button"
import { Loader2, Trash } from "lucide-react"
import { useFormStatus } from "react-dom"




export default function SubmitButtons() {
    const {pending} = useFormStatus()
  return (
    <div>
      {pending ? (
        <Button disabled className="w-fit"><Loader2 className="mr-2 w-4 h-4 animate-spin"/>  Please wait </Button>
      ):
      (
        <Button className="w-fit" type="submit"> Save now</Button>
      )}
    </div>
  )
}

export function StripeSubscriptionCreationButton(){
  const {pending} = useFormStatus()
  return (
    <div>
      {pending ? (
        <Button disabled className="w-full">
          <Loader2 className="mr-2 w-4 h-4 animate-spin"/>  Please wait </Button>
      ):
      (
        <Button type="submit" className="w-full"> 
        Create Subscription
        </Button>
      )}
    </div>
  );
}

export  function StripePortal() {
  const {pending} = useFormStatus()
return (
  <div>
    {pending ? (
      <Button disabled className="w-fit">
      <Loader2 className="mr-2 w-4 h-4 animate-spin"/>  Please wait </Button>
    ):
    (
      <Button className="w-fit" type="submit"> View payment deatils</Button>
    )}
  </div>
)
}

export  function NewNoteSubmitButtons() {
  const {pending} = useFormStatus()
return (
  <div>
    {pending ? (
      <Button disabled className="w-fit"><Loader2 className="mr-2 w-4 h-4 animate-spin"/>  Please wait </Button>
    ):
    (
      <Button className="w-fit" type="submit"> Save now</Button>
    )}
  </div>
)
}

export  function TrashButton() {
  const {pending} = useFormStatus()
return (
  <div>
    {pending ? (
      <Button disabled className="w-fit" variant={"destructive"} size={"icon"}>
        <Loader2 className="mr-2 w-4 h-4 animate-spin"/> 
       </Button>
    ):
    (
      <Button variant={"destructive"} size="icon" type="submit">
      <Trash  className="w-4 h-4"/>
      </Button>
    )}
  </div>
)
}

