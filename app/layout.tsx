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
                  {/* <div className="flex flex-1 flex-col gap-4 p-4">
              <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="bg-muted/50 aspect-video rounded-xl" />
                <div className="bg-muted/50 aspect-video rounded-xl" />
                <div className="bg-muted/50 aspect-video rounded-xl" />
              </div>
              <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
            </div> */}
                  <header className="w-full border-b bg-background">
                    <div className="flex items-center justify-between px-4 md:px-8 py-4 text-chart-3 max-w-7xl mx-auto">
                      <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <BringToFront className="w-6 h-6" />
                        <h1 className="text-xl font-bold">Neuro Press</h1>
                      </Link>
                      <Button variant="outline">Sign In</Button>
                    </div>
                  </header>

                  <main className="w-full px-4 md:px-8 py-6 max-w-7xl mx-auto">
                    {children}
                  </main>
                </SidebarInset>
              </div>
            </SidebarProvider>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
