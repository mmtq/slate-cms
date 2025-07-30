'use client';

import { File, HomeIcon, Settings, ShieldUser, SquareArrowOutUpRight, UserIcon } from "lucide-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import Link from "next/link";

interface Props {

}

const AppSidebar = ({ }: Props) => {
    const items = [
        {
            title: "View Site",
            url: "/",
            icon: SquareArrowOutUpRight,
        },
        {
            title: "Blogs",
            url: "/admin/blogs",
            icon: File,
        },
        {
            title: "Users",
            url: "/admin/users",
            icon: UserIcon,
        },
        {
            title: "Settings",
            url: "admin/settings",
            icon: Settings,
        },
    ]

    return (
        <Sidebar>
            <SidebarHeader>
                <Link href="/admin">
                    <div className="font-semibold truncate flex gap-2"><ShieldUser /> <span>Slate Admin</span></div>
                </Link>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup />
                <SidebarGroupContent>
                    <SidebarMenu>
                        {items.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild>
                                    <Link href={item.url}>
                                        <item.icon />
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    );
};

export default AppSidebar;