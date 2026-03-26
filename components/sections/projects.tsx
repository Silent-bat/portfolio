"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";

const projects = [
  {
    title: "Eduflow",
    description:
      "AI-powered web application designed for schools and students. Features intelligent tutoring, automated grading, and personalized learning paths.",
    tags: ["Next.js", "AI/ML", "PostgreSQL", "Tailwind CSS"],
    link: "https://eduflowai.vercel.app",
    status: "Finished",
    gradient: "from-blue-500/20 to-cyan-500/20",
    accentColor: "#3b82f6",
    preview: (
      <svg viewBox="0 0 400 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {/* Browser chrome */}
        <rect width="400" height="200" rx="8" fill="#0f172a" />
        <rect width="400" height="28" rx="8" fill="#1e293b" />
        <circle cx="16" cy="14" r="4" fill="#ef4444" />
        <circle cx="30" cy="14" r="4" fill="#f59e0b" />
        <circle cx="44" cy="14" r="4" fill="#22c55e" />
        <rect x="60" y="8" width="260" height="12" rx="4" fill="#334155" />
        {/* Sidebar */}
        <rect x="0" y="28" width="80" height="172" fill="#0f172a" />
        <rect x="8" y="40" width="64" height="8" rx="2" fill="#3b82f6" opacity="0.8" />
        <rect x="8" y="56" width="48" height="6" rx="2" fill="#334155" />
        <rect x="8" y="70" width="56" height="6" rx="2" fill="#334155" />
        <rect x="8" y="84" width="40" height="6" rx="2" fill="#334155" />
        <rect x="8" y="108" width="32" height="32" rx="4" fill="#1e40af" opacity="0.6" />
        <rect x="8" y="148" width="32" height="32" rx="4" fill="#1e40af" opacity="0.4" />
        {/* Main content */}
        <rect x="88" y="36" width="120" height="10" rx="2" fill="#e2e8f0" />
        <rect x="88" y="54" width="200" height="56" rx="6" fill="#1e293b" />
        <rect x="96" y="62" width="80" height="6" rx="2" fill="#3b82f6" opacity="0.9" />
        <rect x="96" y="74" width="140" height="4" rx="2" fill="#475569" />
        <rect x="96" y="84" width="100" height="4" rx="2" fill="#475569" />
        <rect x="96" y="96" width="60" height="8" rx="2" fill="#3b82f6" />
        {/* Cards */}
        <rect x="88" y="118" width="90" height="70" rx="6" fill="#1e293b" />
        <rect x="96" y="126" width="40" height="4" rx="2" fill="#94a3b8" />
        <rect x="96" y="136" width="70" height="20" rx="2" fill="#1e40af" opacity="0.4" />
        <rect x="96" y="162" width="50" height="4" rx="2" fill="#3b82f6" opacity="0.8" />
        <rect x="188" y="118" width="90" height="70" rx="6" fill="#1e293b" />
        <rect x="196" y="126" width="40" height="4" rx="2" fill="#94a3b8" />
        <circle cx="231" cy="150" r="16" fill="#1e40af" opacity="0.5" />
        <rect x="196" y="162" width="50" height="4" rx="2" fill="#3b82f6" opacity="0.8" />
        <rect x="296" y="118" width="90" height="70" rx="6" fill="#1e293b" />
        <rect x="304" y="126" width="40" height="4" rx="2" fill="#94a3b8" />
        <rect x="304" y="136" width="72" height="40" rx="2" fill="#1e40af" opacity="0.3" />
        {/* AI sparkle */}
        <circle cx="370" cy="50" r="14" fill="#3b82f6" opacity="0.2" />
        <text x="363" y="55" fill="#3b82f6" fontSize="14" fontFamily="monospace">✦</text>
      </svg>
    ),
  },
  {
    title: "Secure-Watch",
    description:
      "Blockchain-based security solution for authenticating and tracking luxury watches. Immutable provenance and ownership verification.",
    tags: ["React", "Blockchain", "Web3", "Node.js"],
    link: "https://securewatch.vercel.app",
    status: "Finished",
    gradient: "from-amber-500/20 to-orange-500/20",
    accentColor: "#f59e0b",
    preview: (
      <svg viewBox="0 0 400 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="200" rx="8" fill="#0f172a" />
        <rect width="400" height="28" rx="8" fill="#1e293b" />
        <circle cx="16" cy="14" r="4" fill="#ef4444" />
        <circle cx="30" cy="14" r="4" fill="#f59e0b" />
        <circle cx="44" cy="14" r="4" fill="#22c55e" />
        <rect x="60" y="8" width="260" height="12" rx="4" fill="#334155" />
        {/* Watch card */}
        <rect x="20" y="44" width="160" height="148" rx="12" fill="#1e293b" />
        <circle cx="100" cy="110" r="45" fill="#0f172a" stroke="#f59e0b" strokeWidth="3" strokeDasharray="4 2" />
        <circle cx="100" cy="110" r="35" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
        <line x1="100" y1="110" x2="100" y2="83" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
        <line x1="100" y1="110" x2="118" y2="118" stroke="#e2e8f0" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="100" cy="110" r="3" fill="#f59e0b" />
        <rect x="30" y="52" width="80" height="6" rx="2" fill="#e2e8f0" />
        <rect x="30" y="162" width="50" height="6" rx="2" fill="#f59e0b" opacity="0.8" />
        <rect x="30" y="174" width="100" height="4" rx="2" fill="#475569" />
        {/* Blockchain nodes */}
        <circle cx="240" cy="70" r="16" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
        <circle cx="300" cy="60" r="16" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
        <circle cx="360" cy="78" r="16" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
        <circle cx="270" cy="130" r="16" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
        <circle cx="340" cy="140" r="16" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
        <line x1="256" y1="70" x2="284" y2="62" stroke="#f59e0b" strokeWidth="1" opacity="0.6" />
        <line x1="316" y1="62" x2="344" y2="76" stroke="#f59e0b" strokeWidth="1" opacity="0.6" />
        <line x1="248" y1="80" x2="262" y2="118" stroke="#f59e0b" strokeWidth="1" opacity="0.6" />
        <line x1="302" y1="74" x2="278" y2="118" stroke="#f59e0b" strokeWidth="1" opacity="0.6" />
        <line x1="360" y1="94" x2="350" y2="126" stroke="#f59e0b" strokeWidth="1" opacity="0.6" />
        <line x1="286" y1="132" x2="324" y2="138" stroke="#f59e0b" strokeWidth="1" opacity="0.6" />
        <text x="233" y="75" fill="#f59e0b" fontSize="9" fontFamily="monospace">0x1</text>
        <text x="293" y="65" fill="#f59e0b" fontSize="9" fontFamily="monospace">0x2</text>
        <text x="353" y="83" fill="#f59e0b" fontSize="9" fontFamily="monospace">0x3</text>
        <text x="262" y="135" fill="#f59e0b" fontSize="9" fontFamily="monospace">0x4</text>
        <text x="332" y="145" fill="#f59e0b" fontSize="9" fontFamily="monospace">0x5</text>
        {/* Verified badge */}
        <circle cx="360" cy="160" r="22" fill="#f59e0b" opacity="0.15" />
        <circle cx="360" cy="160" r="16" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
        <text x="352" y="165" fill="#f59e0b" fontSize="13">✓</text>
      </svg>
    ),
  },
  {
    title: "Self-Evolving Agent Societies",
    description:
      "AI research paper exploring how autonomous agents can develop their own languages and cultures through emergent behavior.",
    tags: ["AI Research", "LLMs", "Multi-Agent Systems"],
    link: "#",
    status: "Ongoing",
    gradient: "from-purple-500/20 to-pink-500/20",
    accentColor: "#a855f7",
    preview: (
      <svg viewBox="0 0 400 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="200" rx="8" fill="#0f172a" />
        {/* Agent nodes */}
        {[
          { cx: 80, cy: 80, label: "A1" },
          { cx: 200, cy: 50, label: "A2" },
          { cx: 320, cy: 80, label: "A3" },
          { cx: 130, cy: 155, label: "A4" },
          { cx: 270, cy: 155, label: "A5" },
        ].map(({ cx, cy, label }) => (
          <g key={label}>
            <circle cx={cx} cy={cy} r="26" fill="#1e293b" stroke="#a855f7" strokeWidth="1.5" />
            <circle cx={cx} cy={cy} r="20" fill="#2e1065" opacity="0.6" />
            <text x={cx - 8} y={cy + 5} fill="#e879f9" fontSize="11" fontFamily="monospace" fontWeight="bold">{label}</text>
          </g>
        ))}
        {/* Connections */}
        {[
          [80, 80, 200, 50],
          [200, 50, 320, 80],
          [80, 80, 130, 155],
          [320, 80, 270, 155],
          [130, 155, 270, 155],
          [200, 50, 130, 155],
          [200, 50, 270, 155],
        ].map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#a855f7" strokeWidth="1" opacity="0.4" strokeDasharray="4 3" />
        ))}
        {/* Signal pulses */}
        <circle cx="140" cy="65" r="4" fill="#e879f9" opacity="0.9" />
        <circle cx="260" cy="65" r="4" fill="#e879f9" opacity="0.6" />
        <circle cx="105" cy="118" r="4" fill="#e879f9" opacity="0.7" />
        <circle cx="295" cy="118" r="4" fill="#e879f9" opacity="0.5" />
        <circle cx="200" cy="155" r="4" fill="#e879f9" opacity="0.8" />
        {/* Language symbols */}
        <text x="155" y="120" fill="#a855f7" fontSize="10" fontFamily="monospace" opacity="0.8">λ◈⟁</text>
        <text x="215" y="100" fill="#a855f7" fontSize="10" fontFamily="monospace" opacity="0.6">⟁◈λ</text>
        <text x="85" y="135" fill="#a855f7" fontSize="9" fontFamily="monospace" opacity="0.5">◈λ</text>
        <text x="295" y="140" fill="#a855f7" fontSize="9" fontFamily="monospace" opacity="0.5">λ⟁</text>
        {/* Glow */}
        <circle cx="200" cy="50" r="34" fill="#a855f7" opacity="0.06" />
        <text x="170" y="192" fill="#a855f7" fontSize="9" fontFamily="monospace" opacity="0.5">emergent language protocol v0.3</text>
      </svg>
    ),
  },
];

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const nextProject = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  }, []);

  const prevProject = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextProject();
      if (e.key === "ArrowLeft") prevProject();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextProject, prevProject]);

  // Touch / swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) {
      delta > 0 ? nextProject() : prevProject();
    }
    touchStartX.current = null;
  };

  return (
    <section id="projects" className="py-24 md:py-32">
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
            05 / Projects
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mt-4 text-foreground">
            Selected Work
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl">
            A curated selection of projects that showcase my expertise in
            full-stack development, AI integration, and blockchain technology.
          </p>
        </motion.div>

        {/* Projects Carousel */}
        <div className="relative">
          {/* Cards Container */}
          <div
            ref={carouselRef}
            className="relative h-[560px] md:h-[340px]"
            style={{ perspective: "1000px" }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            role="region"
            aria-label="Projects carousel"
            aria-roledescription="carousel"
          >
            {projects.map((project, index) => {
              const offset = index - activeIndex;
              const isActive = index === activeIndex;

              return (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, rotateY: -30 }}
                  animate={{
                    opacity: Math.abs(offset) > 1 ? 0 : 1,
                    rotateY: offset * 15,
                    x: `${offset * 30}%`,
                    z: isActive ? 0 : -100,
                    scale: isActive ? 1 : 0.9,
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className={`absolute inset-0 ${
                    isActive ? "z-10" : "z-0 pointer-events-none"
                  }`}
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div
                    className={`h-full rounded-2xl border border-border bg-gradient-to-br ${project.gradient} backdrop-blur-sm transition-all duration-300 overflow-hidden flex flex-col md:flex-row ${
                      isActive ? "border-accent/30" : ""
                    }`}
                  >
                    {/* Preview illustration */}
                    <div className="md:w-2/5 h-44 md:h-full bg-background/40 flex items-center justify-center overflow-hidden flex-shrink-0 border-b md:border-b-0 md:border-r border-border/50">
                      <div className="w-full h-full p-3">
                        {project.preview}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-grow p-6 md:p-8">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${
                              project.status === "Ongoing"
                                ? "bg-green-500/20 text-green-400"
                                : "bg-accent/20 text-accent"
                            }`}
                          >
                            {project.status}
                          </span>
                          <h3 className="font-serif text-xl md:text-2xl font-bold text-foreground">
                            {project.title}
                          </h3>
                        </div>
                        {project.link !== "#" && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Visit ${project.title}`}
                            className="p-2.5 rounded-xl bg-accent/10 hover:bg-accent/20 transition-colors flex-shrink-0"
                          >
                            <ExternalLink className="w-4 h-4 text-accent" />
                          </a>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
                        {project.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded-lg bg-background/50 border border-border text-xs text-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevProject}
              className="p-3 rounded-xl border border-border hover:border-accent/30 hover:bg-accent/5 transition-colors"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === activeIndex
                      ? "w-8 bg-accent"
                      : "bg-border hover:bg-accent/50"
                  }`}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextProject}
              className="p-3 rounded-xl border border-border hover:border-accent/30 hover:bg-accent/5 transition-colors"
              aria-label="Next project"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* View More CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <a
            href="https://github.com/Silent-bat"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-lg text-muted-foreground hover:text-foreground hover:border-accent/30 transition-colors"
          >
            <Github className="w-5 h-5" />
            View More on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
