import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/general/app-sidebar";
import { SiteHeader } from "@/components/general/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { BringToFront } from "lucide-react";
import Link from "next/link";
import Header from "@/components/general/header";
import { Toaster } from "@/components/ui/sonner";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
})
export const metadata: Metadata = {
  title: "Neuro Press",
  description: "A Content Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${poppins.className} bg-background text-foreground antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >

          <div className="[--header-height:calc(--spacing(14))]">
            <SidebarProvider className="flex flex-col">
              <SiteHeader />
              <div className="flex flex-1">
                <AppSidebar />
                <SidebarInset className="">
                  <main className="w-full px-4 md:px-8 py-6 max-w-7xl mx-auto">
                    {children}
                  </main>
                </SidebarInset>
              </div>
            </SidebarProvider>
          </div>
          <Toaster position="top-center" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
