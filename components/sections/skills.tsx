"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skillCategories = [
  {
    title: "Backend",
    color: "from-amber-500/20 to-orange-500/20",
    skills: ["Node.js", "Express", "NestJS", "Python", "Go", "Rust", "Ruby"],
  },
  {
    title: "Frontend",
    color: "from-blue-500/20 to-cyan-500/20",
    skills: ["React", "Next.js", "Vue.js", "Nuxt.js", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Cloud",
    color: "from-green-500/20 to-emerald-500/20",
    skills: ["AWS", "Vercel", "Netlify", "Docker", "Kubernetes"],
  },
  {
    title: "Database",
    color: "from-purple-500/20 to-pink-500/20",
    skills: ["PostgreSQL", "MongoDB", "Prisma", "Redis", "Supabase"],
  },
  {
    title: "DevOps",
    color: "from-red-500/20 to-rose-500/20",
    skills: ["Git", "GitHub Actions", "GitLab CI", "Docker Compose", "CI/CD"],
  },
];

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 md:py-32">
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
            03 / Skills
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mt-4 text-foreground">
            Tech Arsenal
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl">
            A comprehensive toolkit honed through years of building production
            applications. Always learning, always improving.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="space-y-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="group"
            >
              <div className="flex items-center gap-4 mb-4">
                <h3 className="font-serif text-lg font-semibold text-foreground">
                  {category.title}
                </h3>
                <div className="flex-1 h-px bg-border" />
              </div>
              
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{
                      duration: 0.3,
                      delay: categoryIndex * 0.1 + skillIndex * 0.05,
                    }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className={`px-4 py-2 rounded-lg bg-gradient-to-r ${category.color} border border-border text-sm text-foreground cursor-default transition-shadow hover:shadow-lg hover:shadow-accent/10 hover:border-accent/30`}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Strengths */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            {
              title: "Project Management",
              description: "Leading teams and delivering projects on time and within scope.",
            },
            {
              title: "Rapid Problem Solving",
              description: "Quick analysis and decisive action when issues arise.",
            },
            {
              title: "Team Leadership",
              description: "Mentoring developers and fostering collaborative environments.",
            },
          ].map((strength, index) => (
            <motion.div
              key={strength.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
              className="p-6 rounded-xl border border-border bg-card/30"
            >
              <h4 className="font-serif font-semibold text-foreground mb-2">
                {strength.title}
              </h4>
              <p className="text-sm text-muted-foreground">
                {strength.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
