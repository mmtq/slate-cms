'use client'
import {
  BoltIcon,
  BookOpenIcon,
  Layers2Icon,
  LogIn,
  LogOutIcon,
  PinIcon,
  Plus,
  UserPenIcon,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSession } from "@/lib/auth-client"
import SignOutButton from "./auth/signout-button"
import Link from "next/link"

export default function UserMenu() {
  const session = useSession()
  if (!session.data?.user) {
    return (
      <Button asChild>
        <Link href="/auth/login">
          <LogIn /> <span className="hidden md:block">SignIn</span>
        </Link>
      </Button>
    )
  }

  const namesInitials = session.data.user.name.split(" ")
  const avatarFallback = namesInitials.slice(0, 2).map((name) => name[0]).join("") 

  return (
    <div className="flex items-center justify-center gap-2">
      <Button size={"sm"} asChild>
        <Link href="/create"> <Plus /> <span className="hidden md:block">Create</span> </Link>
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
            <Avatar>
              <AvatarImage src="./avatar.jpg" alt="Profile image" />
              <AvatarFallback className="bg-muted">{avatarFallback}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="max-w-64" align="end">
          <DropdownMenuLabel className="flex min-w-0 flex-col">
            <span className="text-foreground truncate text-sm font-medium">
              {session.data.user.name}
            </span>
            <span className="text-muted-foreground truncate text-xs font-normal">
              {session.data.user.email}
            </span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <BoltIcon size={16} className="opacity-60" aria-hidden="true" />
              <span>Option 1</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Layers2Icon size={16} className="opacity-60" aria-hidden="true" />
              <span>Option 2</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <BookOpenIcon size={16} className="opacity-60" aria-hidden="true" />
              <span>Option 3</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <PinIcon size={16} className="opacity-60" aria-hidden="true" />
              <span>Option 4</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <UserPenIcon size={16} className="opacity-60" aria-hidden="true" />
              <span>Option 5</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignOutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
