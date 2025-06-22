"use client"

import { BringToFront } from "lucide-react"

import { SearchForm } from "@/components/general/search-form"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useSidebar } from "@/components/ui/sidebar"
import { ModeToggle } from "../toggle-theme"
import { navItems } from "@/utils/nav-items"
import { usePathname } from "next/navigation"

export function SiteHeader() {
  const data = navItems
  // const path = usePathname()
  const path = window.location.pathname

  const { toggleSidebar } = useSidebar()

  return (

    <header className="bg-background sticky top-0 z-50 flex w-full items-center border-b">
      <div className="flex h-(--header-height) w-full items-center gap-2 px-4">
        <Button
          className="h-8 w-8"
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
        >
          {/* <SidebarIcon /> */}
          {/* <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg"> */}
            <BringToFront className="size-4" />
          {/* </div> */}

        </Button>
        <Separator orientation="vertical" className="mr-2 h-4" />
        <div className="flex w-full items-center justify-end md:justify-between">
          <Breadcrumb className="hidden sm:block">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{data.navMain.find((item) => item.url === path)?.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex items-center gap-2 ">
            <SearchForm className="w-full sm:ml-auto sm:w-auto" />
            <ModeToggle />

          </div>
        </div>
      </div>
    </header>
  )
}
