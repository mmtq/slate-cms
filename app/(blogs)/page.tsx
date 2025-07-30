'use client'

import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { useSession } from "@/lib/auth-client";
import { Brain, Rocket, Shield } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const { data: session } = useSession();

  const features = [
    {
      icon: Rocket,
      title: "Lightning-Fast Publishing",
      desc: "Launch your blogs instantly with our streamlined tools and zero delays.",
    },
    {
      icon: Brain,
      title: "Smart AI Assistance",
      desc: "Generate, rewrite, and polish your content with the help of powerful AI.",
    },
    {
      icon: Shield,
      title: "Top-Tier Security",
      desc: "Advanced protection mechanisms to keep your data private and safe.",
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section
        className="relative flex flex-col items-center justify-center min-h-[100vh] gap-10 px-6 py-16 text-center bg-gradient-to-b from-background via-background/80 to-transparent overflow-hidden"
      >
        {/* Decorative background circles */}
        <div
          aria-hidden="true"
          className="absolute top-[-10%] left-[-10%] w-[250px] h-[250px] bg-primary/20 rounded-full blur-3xl animate-blob"
        />
        <div
          aria-hidden="true"
          className="absolute bottom-[-15%] right-[-10%] w-[300px] h-[300px] bg-secondary/20 rounded-full blur-3xl animate-blob animation-delay-2000"
        />

        {/* Welcome message */}
        {session?.user && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="overflow-hidden"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground whitespace-nowrap overflow-hidden animate-typing">
              Welcome back,
              <p className="text-primary">
                {session.user.name}
              </p>
            </h1>
          </motion.div>
        )}

        {/* Main headline */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground max-w-4xl leading-tight"
        >
          Your Content. <span className="text-primary">Smarter</span>. Simpler.
        </motion.h2>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="max-w-lg text-lg sm:text-xl text-muted-foreground"
        >
          Build, manage, and grow your content effortlessly with our intuitive, AI-powered CMS designed for creators like you.
        </motion.p>

        {/* Call to Action Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-6 mt-8"
        >
          <Button
            variant="default"
            size="lg"
            className="px-12 hover:scale-[1.05] transition-transform"
          >
            Get Started
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="px-12 hover:scale-[1.05] transition-transform"
          >
            Learn More
          </Button>
        </motion.div>

        {/* Optional: Testimonial / Trust snippet */}
        <motion.blockquote
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.5 }}
          className="mt-12 max-w-xl text-muted-foreground italic text-sm sm:text-base"
        >
          &quot;This CMS transformed how I create content — fast, smart, and secure!&quot; — Jane D., Content Creator
        </motion.blockquote>
      </section>

      {/* Features Section */}
      <section className="flex flex-col items-center justify-center w-full min-h-[90vh] gap-12 border-t border-muted p-12 bg-gradient-to-b from-muted/20 to-transparent">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl font-extrabold text-foreground text-center max-w-3xl"
        >
          Why Creators <span className="text-primary">Love</span> Our CMS
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="max-w-xl text-center text-muted-foreground text-lg sm:text-xl"
        >
          Empower your creative journey with features tailored to make content creation seamless, intelligent, and secure. Discover why hundreds of creators choose us every day.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 w-full max-w-7xl px-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.25, duration: 0.6 }}
              className="relative group"
            >
              <HoverCard>
                <HoverCardTrigger asChild>
                  <div className="relative bg-card rounded-3xl border border-muted p-8 flex flex-col items-center text-center cursor-pointer overflow-hidden shadow-sm transition-transform duration-300 hover:shadow-xl hover:scale-[1.05]">
                    {/* Decorative Accent */}
                    <div className="absolute top-4 right-4 bg-primary/20 rounded-full w-10 h-10 flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>

                    {/* Main Icon */}
                    <feature.icon className="h-12 w-12 text-primary mb-6 z-10" />
                    <h3 className="font-bold text-lg sm:text-xl z-10">{feature.title}</h3>

                    {/* Expanded description */}
                    {/* <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-[220px] z-10">
                      {feature.desc}
                    </p> */}

                    {/* Example bullet points */}
                    <ul className="mt-4 text-xs sm:text-sm text-muted-foreground list-inside space-y-1 max-w-[220px] z-10">
                      {feature.title === "Lightning-Fast Publishing" && (
                        <>
                          <li>Instant post scheduling</li>
                          <li>Real-time preview editor</li>
                          <li>Auto-save drafts</li>
                        </>
                      )}
                      {feature.title === "Smart AI Assistance" && (
                        <>
                          <li>AI-powered content suggestions</li>
                          <li>Automatic paraphrasing</li>
                          <li>Grammar & style check</li>
                        </>
                      )}
                      {feature.title === "Top-Tier Security" && (
                        <>
                          <li>End-to-end encryption</li>
                          <li>Role-based access controls</li>
                          <li>Daily backups & audits</li>
                        </>
                      )}
                    </ul>

                    {/* Call to action inside card */}
                    {/* <Button
                      variant="ghost"
                      size="sm"
                      className="mt-6 text-primary underline opacity-80 hover:opacity-100 z-10"
                    >
                      Learn More
                    </Button> */}
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="text-sm text-muted-foreground text-center max-w-xs">
                  {feature.desc}
                </HoverCardContent>
              </HoverCard>
            </motion.div>
          ))}
        </div>

        {/* Call To Action */}
        {/* <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay: 1.2, duration: 0.5 }}
    className="mt-12"
  >
    <Button size="lg" variant="default" className="px-10">
      Start Your Free Trial Today
    </Button>
  </motion.div> */}
      </section>
    </div>
  );
}
