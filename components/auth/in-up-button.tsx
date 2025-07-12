'use client'
import { Button } from "../ui/button";
import Link from "next/link";
import SignOutButton from "./signout-button";
import { useSession } from "@/lib/auth-client";
import { LogIn } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const InUpButton = () => {
    const session = useSession()
    return (
        <>
            {
                session.data?.user ? (
                    <SignOutButton />
                ) : (
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button size={'sm'} asChild variant={'outline'}>
                                <Link href="/auth/login">
                                    <LogIn />
                                </Link>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>SignIn</p>
                        </TooltipContent>
                    </Tooltip>
                )
            }
        </>
    )
};

export default InUpButton;