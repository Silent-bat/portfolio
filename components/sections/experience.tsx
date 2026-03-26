"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Building2, Calendar } from "lucide-react";

const experiences = [
  {
    role: "Technical Development Department Manager",
    company: "NextVenture Tech",
    location: "Douala",
    period: "2023 - Aug 2025",
    highlights: [
      "Collaborated with engineers, developers, and analysts to design leading hiring software",
      "Developed and designed front-end web architecture with high responsiveness",
      "Worked across departments to address improvements and implementation issues",
      "Applied best practices for clean, secure, readable, and scalable code",
      "Participated in meaningful and thorough code reviews",
      "Hired, trained, and led a successful team of full-stack developers",
    ],
  },
  {
    role: "IT Intern",
    company: "Transitalia TTL",
    location: "Douala",
    period: "2021 - 2023",
    highlights: [
      "Performed coding, debugging, and unit testing tasks in support of projects",
      "Provided ongoing maintenance for assigned applications and systems",
      "Upgraded and maintained both back-end and front-end systems",
      "Worked alongside web developers, marketing teams, and engineers",
      "Remained adaptable and committed to staying on top of growing technologies",
    ],
  },
];

export function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-24 md:py-32 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-accent text-sm font-medium tracking-wider uppercase">
            04 / Experience
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mt-4 text-foreground">
            Work History
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl">
            A track record of delivering impactful solutions and leading
            high-performing teams.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-accent/30 origin-top hidden md:block"
            style={{ transform: "translateX(-50%)" }}
          />

          {/* Experience Cards */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.role}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.2 }}
                className={`relative md:w-[calc(50%-2rem)] ${
                  index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
                }`}
              >
                {/* Timeline dot */}
                <div
                  className={`hidden md:block absolute top-8 w-4 h-4 rounded-full bg-accent border-4 border-background ${
                    index % 2 === 0
                      ? "right-0 translate-x-[calc(100%+1.5rem)]"
                      : "left-0 -translate-x-[calc(100%+1.5rem)]"
                  }`}
                />

                {/* Card */}
                <div className="p-6 md:p-8 rounded-2xl border border-border bg-card/50 hover:border-accent/30 transition-colors">
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <div className="flex items-center gap-2 text-accent">
                      <Building2 className="w-4 h-4" />
                      <span className="font-medium">{exp.company}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  <h3 className="font-serif text-xl font-semibold text-foreground mb-1">
                    {exp.role}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    {exp.location}
                  </p>

                  <ul className="space-y-3">
                    {exp.highlights.map((highlight, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm text-muted-foreground"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
