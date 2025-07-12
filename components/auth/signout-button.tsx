'use client';

import { signOut } from "@/lib/auth-client";
import { Button } from "../ui/button";
import { useTransition } from "react";
import { toast } from "sonner";
import { Loader, LogOut } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface Props {

}

const SignOutButton = ({ }: Props) => {
    const [isPending, startTransition] = useTransition()

    const handleSubmit = () => {
        startTransition(async () => {
            try {
                const res = await signOut()
                if (res.data?.success) {
                    toast.success('Sign out successful')
                }
                else if (res.error) {
                    toast.error(res.error.message || 'Sign out failed')
                }
            } catch (err) {
                console.error(err)
                toast.error('Something went wrong')
            }
        })
    }
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button size={"sm"} onClick={handleSubmit} variant={"destructive"} disabled={isPending}>
                    {isPending ? <Loader className="animate-spin" /> : <LogOut />}
                </Button>

            </TooltipTrigger>
            <TooltipContent>
                <p>SignOut</p>
            </TooltipContent>
        </Tooltip>
    );
};

export default SignOutButton;