'use client';

import { File, Globe, HomeIcon, LayoutDashboard, MessageCircle, Settings, ShieldUser, SquareArrowOutUpRight, UserIcon } from "lucide-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import Link from "next/link";

interface Props {

}

const AppSidebar = ({ }: Props) => {
    const items = [
        {
            title: "Dashboard",
            url: "/admin",
            icon: LayoutDashboard,
        },
        {
            title: "Blogs",
            url: "/admin/blogs",
            icon: File,
        },
        {
            title: "Comments",
            url: "/admin/comments",
            icon: MessageCircle,
        },
        {
            title: "Users",
            url: "/admin/users",
            icon: UserIcon,
        },
        {
            title: "Settings",
            url: "/admin/settings",
            icon: Settings,
        },
    ]

    return (
        <Sidebar>
            <SidebarHeader className="flex flex-row items-center p-4 border-b border-gray-200 dark:border-gray-700">
                <div>
                    <ShieldUser size={32} className="text-blue-600" />
                </div>
                <div className="flex flex-col">
                    <Link href="/admin" className="flex items-center gap-2 font-semibold text-lg truncate hover:text-blue-600 transition-colors">
                        <span>Slate Admin</span>
                    </Link>
                    <Link href="/" className="flex justify-center items-center gap-2 text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
                        <Globe size={12} />
                        <span>View Site</span>
                    </Link>
                </div>
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