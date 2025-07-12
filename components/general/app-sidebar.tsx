"use client"

import * as React from "react"
import { NavMain } from "@/components/general/nav-main"
import { NavUser } from "@/components/general/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { navItems } from "@/utils/nav-items"
import { useSession } from "@/lib/auth-client"

const data = navItems

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const session = useSession()

  const nouser = !session.data?.user
  let user
  if (session.data?.user){
    user = {
      name: session.data.user.name,
      email: session.data.user.email,
      avatar:  "/avatars/shadcn.jpg"
    }
  }


  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}
    >
      {/* <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Neuro Press</span>
                  <span className="truncate text-xs">CMS</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader> */}
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        {/* <NavUser user={data.user} /> */}
        {
          user && (
            <NavUser user={user} />
          )
        }
      </SidebarFooter>
    </Sidebar>
  )
}
