"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MessageSquare, FileText, Code, Rocket } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    title: "Discovery",
    description:
      "We start with a deep dive into your project. Understanding your goals, users, and technical requirements.",
  },
  {
    icon: FileText,
    title: "Planning",
    description:
      "I create a detailed roadmap with milestones, tech stack recommendations, and clear deliverables.",
  },
  {
    icon: Code,
    title: "Development",
    description:
      "Iterative development with regular updates. You'll see progress every step of the way.",
  },
  {
    icon: Rocket,
    title: "Launch",
    description:
      "Thorough testing, deployment, and handoff. Plus ongoing support to ensure your success.",
  },
];

export function Process() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="process" className="py-24 md:py-32 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="text-accent text-sm font-medium tracking-wider uppercase">
            06 / Process
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mt-4 text-foreground">
            How I Work
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            A streamlined process designed for clarity, collaboration, and
            exceptional results.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-accent -translate-y-1/2 origin-left"
          />

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
                className="relative"
              >
                {/* Step Number */}
                <div className="lg:absolute lg:-top-4 lg:left-1/2 lg:-translate-x-1/2 mb-6 lg:mb-0">
                  <div className="w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-serif font-bold text-lg relative z-10">
                    {index + 1}
                  </div>
                </div>

                {/* Card */}
                <div className="lg:pt-12 text-center lg:text-left">
                  <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 mx-auto lg:mx-0">
                    <step.icon className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
