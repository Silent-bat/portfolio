"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Code2,
  Server,
  Brain,
  Cloud,
  Rocket,
  MessageSquare,
} from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Full-Stack Development",
    description:
      "End-to-end web applications using React, Next.js, Vue, and Node.js with pixel-perfect UI and robust backends.",
  },
  {
    icon: Server,
    title: "API Architecture",
    description:
      "RESTful & GraphQL APIs built for scale. Clean, documented, and production-ready from day one.",
  },
  {
    icon: Brain,
    title: "AI Integration",
    description:
      "LLM-powered features, intelligent automation, and custom AI solutions tailored to your business needs.",
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    description:
      "AWS, Vercel, Docker, and Kubernetes. CI/CD pipelines that ship code safely and fast.",
  },
  {
    icon: Rocket,
    title: "SaaS Products",
    description:
      "From MVP to scale — authentication, payments, dashboards, and everything in between.",
  },
  {
    icon: MessageSquare,
    title: "Technical Consulting",
    description:
      "Architecture reviews, code audits, and strategic guidance to help your team make the right decisions.",
  },
];

type Service = typeof services[number];

function ServiceCard({ service, index, isInView }: { service: Service; index: number; isInView: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -14;
    const gx = ((e.clientX - rect.left) / rect.width) * 100;
    const gy = ((e.clientY - rect.top) / rect.height) * 100;
    setTilt({ x, y });
    setGlowPos({ x: gx, y: gy });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false); }}
      style={{
        transform: hovered
          ? `perspective(600px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale(1.02)`
          : "perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)",
        transition: "transform 0.2s ease",
      }}
      className="group relative p-6 md:p-8 rounded-2xl border border-border bg-card/50 hover:border-accent/30 overflow-hidden cursor-default"
    >
      {/* Spotlight glow */}
      {hovered && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(212,168,85,0.08) 0%, transparent 60%)`,
          }}
        />
      )}

      {/* Icon */}
      <motion.div
        animate={hovered ? { scale: 1.15, rotate: 5 } : { scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors"
      >
        <service.icon className="w-6 h-6 text-accent" />
      </motion.div>

      {/* Content */}
      <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
        {service.title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {service.description}
      </p>

      {/* Hover accent corner */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-accent/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
}

export function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-24 md:py-32 relative">
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
            01 / Services
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mt-4 text-foreground">
            What I Can Build
            <br />
            <span className="text-accent">For You</span>
          </h2>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
