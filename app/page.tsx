'use client'

import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { useSession } from "@/lib/auth-client";
import { Brain, Rocket, Shield } from "lucide-react";

export default  function Home() {
  const {data: session} = useSession();

  const features = [
    {
      icon: Rocket,
      title: "Fast Publishing",
      desc: "Create and publish blogs in seconds with optimized workflows.",
    },
    {
      icon: Brain,
      title: "AI Assistance",
      desc: "Leverage AI for generating and paraphrasing content creatively.",
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      desc: "Enterprise-grade security ensures your data stays protected.",
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-[90vh] gap-6 px-4 py-8 text-center bg-gradient-to-br from-background via-muted to-secondary">
        {session?.user && (
          <div className="max-w-full overflow-hidden">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-foreground">
              <span className="inline-block whitespace-nowrap overflow-hidden animate-typing">
                Welcome, <span className="gradient-text">{session.user.name}!</span>
                <span className="blinking-cursor">|</span>
              </span>
            </h1>
          </div>
        )}

        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-foreground">
          Manage your content with ease!
        </h1>
        <p className="max-w-md text-sm sm:text-base text-muted-foreground">
          Streamline your content workflow with our user-friendly CMS.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <Button variant="outline">Try it out!</Button>
          <Button variant="default">Learn more</Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="flex flex-col items-center justify-center w-full min-h-[45vh] gap-6 bg-gradient-to-br from-secondary via-muted/40 to-background border-t p-6">
        <h2 className="text-lg sm:text-xl font-semibold text-foreground text-center">
          Why choose our CMS?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl px-4">
          {features.map((feature) => (
            <HoverCard key={feature.title}>
              <HoverCardTrigger asChild>
                <div className="bg-card hover:shadow-md rounded-xl border p-6 flex flex-col items-center text-center transition-all cursor-pointer">
                  <feature.icon className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-semibold text-base sm:text-lg">{feature.title}</h3>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="text-sm text-muted-foreground text-center">
                {feature.desc}
              </HoverCardContent>
            </HoverCard>
          ))}
        </div>
      </section>
    </div>
  );
}
