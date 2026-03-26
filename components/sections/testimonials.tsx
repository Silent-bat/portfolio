"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { Quote, ChevronLeft, ChevronRight, Star, Pause, Play } from "lucide-react";

const testimonials = [
  {
    name: "Amara Diallo",
    role: "Founder, TradeSync Africa",
    avatar: "AD",
    rating: 5,
    text: "Rosnel built our B2B trading platform from scratch in under 8 weeks. The real-time inventory sync and multi-currency support worked flawlessly from day one. His ability to translate complex business logic into clean, maintainable code is unmatched.",
  },
  {
    name: "Ethan Brooke",
    role: "CEO, Fitpulse App",
    avatar: "EB",
    rating: 5,
    text: "We hired Rosnel to overhaul our fitness tracking app and the results were beyond expectations. He redesigned the entire frontend in Next.js, integrated our wearable API, and cut load times by over 60%. Our user retention jumped 35% the following month.",
  },
  {
    name: "Nadia Rousseau",
    role: "Head of Product, LegalEase",
    avatar: "NR",
    rating: 5,
    text: "Rosnel built our AI-powered contract review tool with remarkable precision. The document parsing pipeline he architected handles thousands of pages daily without breaking a sweat. He's one of the rare engineers who genuinely understands both product and technology.",
  },
  {
    name: "David Mensah",
    role: "Co-Founder, PayNest",
    avatar: "DM",
    rating: 5,
    text: "Our fintech startup needed a developer who could move fast without cutting corners — Rosnel delivered exactly that. He integrated our payment gateway, built the dashboard, and set up automated fraud detection, all while keeping the codebase clean and well-tested.",
  },
  {
    name: "Sofia Andersen",
    role: "CTO, Brandly Studio",
    avatar: "SA",
    rating: 5,
    text: "Rosnel redesigned our SaaS platform and the feedback from clients was immediate and overwhelmingly positive. He has a rare eye for design detail combined with deep technical skill. The new dashboard is fast, beautiful, and incredibly intuitive.",
  },
  {
    name: "Kevin Tchamba",
    role: "Founder, MediTrack",
    avatar: "KT",
    rating: 5,
    text: "Building a healthcare scheduling platform requires extreme reliability and Rosnel delivered that in spades. He implemented real-time appointment booking, SMS notifications, and a role-based access system — all production-ready and HIPAA-conscious. Exceptional work.",
  },
];

const AUTOPLAY_DELAY = 5000;

export function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    setProgress(0);
  }, []);

  const prev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setProgress(0);
  }, []);

  const goTo = useCallback((i: number) => {
    setActiveIndex(i);
    setProgress(0);
  }, []);

  // Autoplay
  useEffect(() => {
    if (isPaused) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
      return;
    }
    setProgress(0);
    const TICK = 50;
    progressRef.current = setInterval(() => {
      setProgress((p) => Math.min(p + (TICK / AUTOPLAY_DELAY) * 100, 100));
    }, TICK);
    intervalRef.current = setInterval(() => {
      next();
    }, AUTOPLAY_DELAY);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [isPaused, activeIndex, next]);

  const active = testimonials[activeIndex];

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-secondary/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="text-accent text-sm font-medium tracking-wider uppercase">
            07 / Testimonials
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mt-4 text-foreground">
            What Clients Say
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Feedback from people I've had the pleasure of building with.
          </p>
        </motion.div>

        {/* Testimonial Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
          role="region"
          aria-label="Testimonials carousel"
          aria-roledescription="carousel"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Progress bar */}
          <div className="w-full h-0.5 bg-border rounded-full mb-6 overflow-hidden">
            <motion.div
              className="h-full bg-accent rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-border bg-card/50 p-8 md:p-12 transition-all duration-300 hover:border-accent/20 hover:shadow-xl hover:shadow-accent/5">
            {/* Quote icon */}
            <Quote className="absolute top-6 right-8 w-12 h-12 text-accent/10" aria-hidden="true" />

            {/* Stars */}
            <div className="flex gap-1 mb-6" aria-label={`${active.rating} out of 5 stars`}>
              {Array.from({ length: active.rating }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Star className="w-4 h-4 fill-accent text-accent" aria-hidden="true" />
                </motion.div>
              ))}
            </div>

            {/* Text */}
            <motion.blockquote
              key={activeIndex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="text-lg md:text-xl text-foreground leading-relaxed mb-8 font-light"
            >
              &ldquo;{active.text}&rdquo;
            </motion.blockquote>

            {/* Author */}
            <motion.div
              key={`author-${activeIndex}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: 0.1 }}
              className="flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 ring-2 ring-accent/10">
                <span className="text-accent font-semibold text-sm">{active.avatar}</span>
              </div>
              <div>
                <p className="font-semibold text-foreground">{active.name}</p>
                <p className="text-sm text-muted-foreground">{active.role}</p>
              </div>
            </motion.div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="p-3 rounded-xl border border-border hover:border-accent/30 hover:bg-accent/5 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goTo(index)}
                  className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                    index === activeIndex ? "w-8 bg-accent" : "w-2 bg-border hover:bg-accent/50"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                  aria-current={index === activeIndex ? "true" : undefined}
                />
              ))}
            </div>

            {/* Play/Pause */}
            <button
              onClick={() => setIsPaused((p) => !p)}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label={isPaused ? "Resume autoplay" : "Pause autoplay"}
            >
              {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            </button>

            <button
              onClick={next}
              className="p-3 rounded-xl border border-border hover:border-accent/30 hover:bg-accent/5 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
