'use client'
import { Button } from "../ui/button";
import Link from "next/link";
import SignOutButton from "./signout-button";
import { useSession } from "@/lib/auth-client";
import { LogIn } from "lucide-react";

const InUpButton = () => {
    const session = useSession()
    return (
        <>
        {
            session.data?.user ? (
                <SignOutButton />
            ) : (
                <Button size={'sm'} asChild variant={'outline'}><Link href="/auth/login"><LogIn /></Link></Button>
            )
        }
        </>
    )
};

export default InUpButton;