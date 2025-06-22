import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Brain, Rocket, Shield } from "lucide-react";

export default function Home() {
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
  ]

  return (
    <div>
      <section className="flex flex-col items-center justify-center w-full h-[45vh] gap-4 bg-gradient-to-br from-background via-muted to-secondary">
        <div>
          <h1 className="text-2xl text-foreground font-bold tracking-tighter md:text-3xl">
            Manage your content with ease!
          </h1>
          <p className="mx-auto text-muted-foreground">
            Streamline your content workflow and publish with confidence.
          </p>
        </div>
        <div className="flex flex-row gap-4">
          <Button variant="outline">Try it out!</Button>
          <Button variant='default'>Learn more</Button>
        </div>
      </section>

      <section className="flex flex-col items-center justify-center w-full min-h-[50vh] gap-4 bg-gradient-to-br from-secondary via-muted/40 to-background border-t py-5">
        <h2 className="text-xl font-semibold text-foreground">Why choose our CMS?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {features.map((feature) => (
            <HoverCard  key={feature.title}>
              <HoverCardTrigger asChild>
                <div className="bg-card hover:shadow-lg rounded-xl border p-4 flex flex-col items-center text-center transition-all cursor-pointer">
                  <feature.icon className="h-8 w-8 text-primary mb-4" />
                  <h3 className="font-semibold text-lg">{feature.title}</h3>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="text-sm text-muted-foreground text-center">
                {feature.desc}
              </HoverCardContent>
            </HoverCard>
          ))}
        </div>
      </section>

      <section className="flex flex-col items-center justify-center w-full h-[91vh] gap-4 bg-gradient-to-br from-muted/20 via-muted to-muted-foreground/10 border-t">
        <h2 className="text-xl font-semibold text-foreground">What you can do</h2>
        <p className="text-muted-foreground max-w-md text-center">
          Write, edit, and publish your blogs with smart automation and clean UI.
        </p>
      </section>

    </div>
  );
}
