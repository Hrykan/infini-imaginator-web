"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence, useReducedMotion } from "framer-motion";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { GradientDots } from "@/components/ui/gradient-dots";
import { FeatureCard } from "@/components/ui/grid-feature-cards";
import HighlightCard from "@/components/ui/highlight-card";
import {
  ExternalLink,
  Mail,
  Linkedin,
  ArrowRight,
  ChevronDown,
  Zap,
  BarChart3,
  Brain,
  Clock,
  TrendingUp,
  DollarSign,
  FileText,
  Bot,
  Database,
  PieChart,
  Code2,
} from "lucide-react";

// ─── Type declarations for Vanta ────────────────────────────────
declare global {
  interface Window {
    VANTA: {
      NET: (config: Record<string, unknown>) => { destroy: () => void };
    };
    THREE: unknown;
  }
}

// ─── Animated Counter ───────────────────────────────────────────
function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  duration = 2000,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(target);
      return;
    }
    let startTime: number | null = null;
    const startValue = 0;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * (target - startValue) + startValue));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };

    requestAnimationFrame(step);
  }, [inView, target, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

// ─── Fade-up wrapper ────────────────────────────────────────────
function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Floating dot navigation ────────────────────────────────────
const NAV_SECTIONS = [
  { id: "hero",     label: "Home" },
  { id: "results",  label: "Results" },
  { id: "products", label: "Products" },
  { id: "services", label: "Services" },
  { id: "process",  label: "Process" },
  { id: "team",     label: "Founder" },
  { id: "faq",      label: "FAQ" },
  { id: "contact",  label: "Contact" },
];

function FloatingDotNav({
  active,
  onNavigate,
}: {
  active: string;
  onNavigate: (id: string) => void;
}) {
  return (
    <nav
      aria-label="Quick section navigation"
      className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3.5"
    >
      {NAV_SECTIONS.map((s) => (
        <button
          key={s.id}
          onClick={() => onNavigate(s.id)}
          aria-label={`Go to ${s.label}`}
          className="group relative flex items-center justify-end gap-2.5"
        >
          {/* Label — slides in on hover */}
          <span className="pointer-events-none opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all duration-200 font-mono-custom text-[9px] tracking-widest uppercase text-[#999999] bg-[#111111]/95 border border-white/10 px-2 py-0.5 whitespace-nowrap">
            {s.label}
          </span>
          {/* Dot */}
          <span
            className={`block rounded-full transition-all duration-300 ${
              active === s.id
                ? "w-2.5 h-2.5 bg-[#e74c3c] shadow-[0_0_8px_rgba(231,76,60,0.7)]"
                : "w-1.5 h-1.5 bg-white/20 group-hover:bg-white/50"
            }`}
          />
        </button>
      ))}
    </nav>
  );
}

// ─── FAQ Accordion ───────────────────────────────────────────────
const FAQ_ITEMS = [
  {
    q: "What services does Infini Imaginator offer?",
    a: "Three core services: AI Automation & Integration (n8n workflows, AI agents, API orchestration), Business Intelligence & Analytics (executive dashboards, Snowflake, ETL pipelines, Tableau/Qlik/Sigma reporting), and AI Strategy & Transformation (GenAI readiness, modernisation roadmaps, ROI frameworks).",
  },
  {
    q: "How much does AI automation consulting cost?",
    a: "We offer a free initial consultation with no commitment and no sales pressure. Pricing is scoped to your specific project after the discovery call. Contact business@imaginator.in to start a conversation.",
  },
  {
    q: "What is Infini Imaginator's experience with Snowflake?",
    a: "3+ years of production Snowflake experience, including data warehouse architecture, ETL pipeline design, and integration with BI tools like Sigma Computing and Tableau.",
  },
  {
    q: "What is n8n and how do you use it?",
    a: "n8n is an open-source workflow automation platform. We use it to build custom business automation workflows — connecting APIs, databases, and AI models to eliminate repetitive manual processes.",
  },
  {
    q: "Does Infini Imaginator build AI products?",
    a: "Yes. We've shipped Yuga Odysseys (scenario-based personal growth platform, 588 challenges across 24 life domains) and an AI-powered Research Assistant that automates competitive intelligence. Built with React Native, Next.js, TypeScript, OpenAI API, and Supabase.",
  },
  {
    q: "What BI tools do you work with?",
    a: "Tableau, Qlik Sense, Sigma Computing, SSRS, and custom executive dashboard development — connected to Snowflake, SQL Server, and PostgreSQL data warehouses.",
  },
  {
    q: "What results have you delivered?",
    a: "Identifying $500K in data tolerance issues via executive dashboards, contributing to 25% faster loan processing and 40% lower labour costs, managing 500+ BI reports, and building 111 ETL pipelines at Accenture.",
  },
  {
    q: "Who will I be working with?",
    a: "Directly with Mukul Kulkarni — founder, principal consultant, and the person who does the work. No account managers, no handoffs to junior staff.",
  },
];

function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="space-y-2">
      {FAQ_ITEMS.map((item, i) => (
        <FadeUp key={i} delay={i * 0.04}>
          <div className="border border-white/10 rounded-xl overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-white/[0.03] transition-colors"
              aria-expanded={open === i}
            >
              <span className="type-body text-[#f5f5f5] font-medium">{item.q}</span>
              <span className={`flex-shrink-0 w-5 h-5 flex items-center justify-center border border-white/20 rounded-full transition-transform duration-200 ${open === i ? "rotate-45 border-[#e74c3c]" : ""}`}>
                <span className={`text-xs leading-none ${open === i ? "text-[#e74c3c]" : "text-[#8a8a8a]"}`}>+</span>
              </span>
            </button>
            {open === i && (
              <div className="px-6 pb-5">
                <p className="type-body-sm text-[#999999] leading-relaxed">{item.a}</p>
              </div>
            )}
          </div>
        </FadeUp>
      ))}
    </div>
  );
}

// ─── Main Page ──────────────────────────────────────────────────
export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const vantaRef = useRef<{ destroy: () => void } | null>(null);
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  // Vanta.NET hero background
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const loadScript = (src: string) =>
      new Promise<void>((resolve) => {
        const existing = document.querySelector(`script[src="${src}"]`);
        if (existing) {
          resolve();
          return;
        }
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => resolve();
        document.head.appendChild(script);
      });

    loadScript(
      "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
    )
      .then(() =>
        loadScript(
          "https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.net.min.js"
        )
      )
      .then(() => {
        if (window.VANTA && heroRef.current) {
          vantaRef.current = window.VANTA.NET({
            el: heroRef.current,
            color: 0xe74c3c,
            backgroundColor: 0x080808,
            points: 8,
            maxDistance: 20,
            spacing: 18,
          });
        }
      })
      .catch(() => {
        // Vanta CDN failed to load — hero renders with solid background fallback
      });

    return () => {
      if (vantaRef.current) vantaRef.current.destroy();
    };
  }, []);

  // Nav scroll state
  useEffect(() => {
    const handleScroll = () => setNavScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active section tracking for floating nav
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    NAV_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => { if (e.isIntersecting) setActiveSection(id); });
        },
        { threshold: 0.35, rootMargin: "-10% 0px -10% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Custom cursor
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    document.body.classList.add('has-custom-cursor');
    const dot = document.createElement("div");
    dot.className = "cursor-dot";
    const ring = document.createElement("div");
    ring.className = "cursor-ring";
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    };

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      rafId = requestAnimationFrame(animateRing);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    rafId = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
      dot.remove();
      ring.remove();
      document.body.classList.remove('has-custom-cursor');
    };
  }, []);

  const scrollToSection = useCallback((id: string) => {
    setMobileMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? "instant" as ScrollBehavior : "smooth" as ScrollBehavior;
        el.scrollIntoView({ behavior });
      }
    }, 300);
  }, []);

  // Hero headline characters
  const headline = "FROM RAW DATA TO REAL BUSINESS IMPACT";
  const headlineChars = headline.split("");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.015,
        delayChildren: 0.3,
      },
    },
  };

  const charVariants = {
    hidden: { opacity: 0, y: 60, rotateX: -90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  const subWords =
    "Most businesses have data. Few turn it into competitive advantage. We bridge that gap, drawing on 9+ years of enterprise BI depth, applying AI pair programming where human judgment drives every decision, and building with best practices that catch problems before they surface.".split(
      " "
    );

  const services = [
    {
      icon: Zap,
      title: "AI Automation & Integration",
      description:
        "Eliminate repetitive workflows and unlock operational efficiency with intelligent automation tailored to your business.",
      features: [
        "n8n workflow automation",
        "AI agent development",
        "API integration & orchestration",
        "Process optimization & RPA",
        "Custom AI tool pipelines",
      ],
    },
    {
      icon: BarChart3,
      title: "Business Intelligence & Analytics",
      description:
        "Transform raw data into executive clarity. We design and build dashboards, reporting pipelines, and data infrastructure that give decision-makers the intelligence to act, built right the first time, backed by enterprise-grade data engineering depth.",
      features: [
        "Executive dashboards (Sigma, Tableau, Qlik)",
        "Advanced SQL reporting & SSRS",
        "ETL pipeline design (Informatica, CDC)",
        "Snowflake & data warehouse architecture",
        "Workforce analytics & QA/QC reporting",
      ],
    },
    {
      icon: Brain,
      title: "AI Strategy & Transformation",
      description:
        "Navigate the AI landscape with confidence. We translate AI capabilities into practical, buildable systems. No hype, no slide decks. Every recommendation is grounded in what we've actually designed and deployed.",
      features: [
        "GenAI readiness & strategy",
        "Technology modernization roadmaps",
        "Legacy system AI integration",
        "Change management & training",
        "ROI framework consulting",
      ],
    },
  ];

  const products = [
    {
      name: "Yuga Odysseys",
      tagline: "Challenge. Decide. Grow.",
      description:
        "A scenario-based platform where users learn and grow through real-world challenges across 24 life domains, from Ethics and Digital Literacy to Philosophy and Spirituality. Users face realistic dilemmas, decide, receive reflective guidance from AI mentor Guruji, and develop clarity over time. Not a course with an endpoint. An ongoing daily practice for life skills.",
      features: [
        "24 life domains with 588 scenario-based challenges",
        "AI mentor (Guruji) for personalized reflective guidance",
        "Core loop: Challenge → Decide → Reflect → Grow",
        "Adaptive difficulty from beginner (age 14+) to advanced",
        "Trilingual: English, Hindi, Marathi",
      ],
      link: "https://yuga.life",
      label: "PRODUCT 01",
      hasImage: true,
      image: "/yuga-preview.jpg",
      imageAlt: "Screenshot of Yuga Odysseys scenario challenge interface",
    },
    {
      name: "Research Assistant",
      tagline: "Automated Market Intelligence at Scale",
      description:
        "Stop spending hours on manual research. Our AI-powered research assistant autonomously gathers, synthesizes, and structures competitive intelligence, market trends, and industry data into actionable reports.",
      features: [
        "Multi-source web research",
        "Automated report generation",
        "Competitive landscape analysis",
        "Market trend synthesis",
        "Exportable structured outputs",
      ],
      link: "https://research.imaginator.in/",
      label: "PRODUCT 02",
      hasImage: true,
      image: "/research-preview.jpg",
      imageAlt: "Screenshot of Research Assistant automated intelligence dashboard",
    },
  ];

  const stats = [
    { value: 500, suffix: "K", label: "Value Identified via Dashboards", icon: <TrendingUp size={20} />, prefix: "$" },
    { value: 200, suffix: "K+", label: "Annual Cost Savings Driven", icon: <DollarSign size={20} />, prefix: "$" },
    { value: 500, suffix: "+", label: "BI Reports Managed", icon: <FileText size={20} /> },
    { value: 9, suffix: "+", label: "Years Enterprise Experience", icon: <Clock size={20} /> },
  ];

  const whyUs = [
    {
      num: "01",
      title: "9+ Years Across US & India Enterprise",
      description:
        "From building 111 ETL pipelines at Accenture Mumbai to managing reporting infrastructure for a top US mortgage lender. We've worked across the full data lifecycle in enterprise environments spanning mortgage, financial services, and Fortune 500 organizations.",
    },
    {
      num: "02",
      title: "Executive-Level Impact",
      description:
        "We don't just build reports. We partner with VPs, EVPs, and department heads to drive real business outcomes. Our dashboards have identified $500K in tolerance issues, contributed to 25% faster loan processing, and 40% lower labor costs.",
    },
    {
      num: "03",
      title: "Builder Mentality, Not Just Strategy",
      description:
        "We ship working products. From Yuga Odysseys (concept to production in 30 days) to executive command-centre dashboards on 6 live screens. We execute, not just strategize. We stay current with every major AI advancement and use AI as a pair programmer to move fast without cutting corners. Human expertise decides; AI accelerates.",
    },
    {
      num: "04",
      title: "Human Judgment. AI Speed. Zero Shortcuts.",
      description:
        "We use the best modern tools (Snowflake, Sigma, OpenAI, Claude), but tools are only as good as the judgment behind them. Every decision is made by a human with enterprise context. Every build is grounded in best practices that prevent problems before they surface, not patches applied after the fact.",
    },
  ];

  const techStack = [
    {
      category: "AI & Automation",
      items: ["OpenAI API / GPT-4", "Claude Code", "n8n Workflows", "LangChain", "AI-Assisted Dev", "ChatGPT"],
      icon: <Bot className="w-8 h-8 text-[#e74c3c]" />,
    },
    {
      category: "Data & Analytics",
      items: ["Snowflake (3+ yrs)", "SQL Server", "PostgreSQL", "Sigma Computing", "Informatica", "ETL / CDC"],
      icon: <Database className="w-8 h-8 text-[#e74c3c]" />,
    },
    {
      category: "BI & Visualization",
      items: ["SSRS", "Tableau", "Qlik Sense", "Executive Dashboards", "Data Warehousing", "Workforce Analytics"],
      icon: <PieChart className="w-8 h-8 text-[#e74c3c]" />,
    },
    {
      category: "Development",
      items: ["React Native", "TypeScript", "Python", "SQL (Advanced)", "Supabase", "Next.js"],
      icon: <Code2 className="w-8 h-8 text-[#e74c3c]" />,
    },
  ];

  const navLinks = ["Services", "Products", "Contact"];

  return (
    <div className="min-h-screen bg-[#080808] text-[#f5f5f5] overflow-x-hidden">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#e74c3c] focus:text-white">
        Skip to main content
      </a>

      {/* Floating dot navigation */}
      <FloatingDotNav active={activeSection} onNavigate={(id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? "instant" : "smooth" });
      }} />
      {/* ── Navigation ─────────────────────────────────────────── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          navScrolled ? "glass-nav py-3" : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-mono-custom text-sm font-bold tracking-widest text-[#f5f5f5] hover:text-[#e74c3c] transition-colors duration-200"
          >
            <span className="inline-flex items-center gap-2.5">
              <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <rect x="9" y="7" width="3.5" height="18" rx="1" transform="rotate(15 9 7)" fill="#C0392B"/>
                <rect x="18" y="7" width="3.5" height="18" rx="1" transform="rotate(15 18 7)" fill="#C0392B"/>
              </svg>
              INFINI IMAGINATOR
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => scrollToSection(link.toLowerCase())}
                className="animated-underline text-sm font-medium text-[#999999] hover:text-[#f5f5f5] transition-colors duration-200 tracking-wider"
              >
                {link.toUpperCase()}
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <a
              href={process.env.NEXT_PUBLIC_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#e74c3c] text-[#e74c3c] hover:bg-[#e74c3c] hover:text-white transition-all duration-300 type-cta"
            >
              BOOK A FREE CALL
              <ArrowRight size={14} />
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-3"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <span
              className={`block h-px w-6 bg-[#f5f5f5] transition-all duration-200 ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block h-px w-6 bg-[#f5f5f5] transition-all duration-200 ${mobileMenuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-px w-6 bg-[#f5f5f5] transition-all duration-200 ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-menu"
              role="navigation"
              aria-label="Mobile navigation"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden glass-nav border-t border-[#e74c3c]/20"
            >
              <div className="px-6 py-6 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <button
                    key={link}
                    onClick={() => scrollToSection(link.toLowerCase())}
                    className="text-left text-sm font-medium text-[#999999] hover:text-[#f5f5f5] tracking-widest transition-colors"
                  >
                    {link.toUpperCase()}
                  </button>
                ))}
                <a
                  href={process.env.NEXT_PUBLIC_BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-2 px-5 py-3 border border-[#e74c3c] text-[#e74c3c] hover:bg-[#e74c3c] hover:text-white transition-all duration-300 type-cta w-fit"
                >
                  BOOK A FREE CALL
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main id="main-content">
      {/* ── Hero ───────────────────────────────────────────────── */}
      <section
        id="hero"
        ref={heroRef}
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden"
        style={{ background: "#080808" }}
      >
        {/* Vanta renders into this element's background */}
        <div className="absolute inset-0 z-0" />

        {/* Gradient overlay */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#080808]/30 via-transparent to-[#080808]" />

        <div className="relative z-[2] max-w-6xl mx-auto">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="section-label mb-8 inline-block"
          >
            AI Automation · Business Intelligence · Strategy
          </motion.div>

          {/* Headline — staggered character reveal */}
          <motion.h1
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="type-hero text-[#f5f5f5] mb-8"
            style={{ perspective: "800px" }}
            aria-label={headline}
          >
            {headline.split(" ").map((word, wi, words) => (
              <span key={wi} className="inline-block whitespace-nowrap">
                {word.split("").map((char, ci) => (
                  <motion.span key={ci} variants={charVariants} className="inline-block">
                    {char}
                  </motion.span>
                ))}
                {wi < words.length - 1 && (
                  <motion.span variants={charVariants} className="inline-block">&nbsp;</motion.span>
                )}
              </span>
            ))}
          </motion.h1>

          {/* Sub-headline — word by word */}
          <motion.p
            className="max-w-2xl mx-auto type-body-lg text-[#999999] mb-12"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.03, delayChildren: 0.8 },
              },
            }}
          >
            {subWords.map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-[0.3em]"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.4, ease: "easeOut" },
                  },
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href={process.env.NEXT_PUBLIC_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-[#e74c3c] text-white hover:bg-[#f05a46] transition-all duration-300 type-cta"
            >
              BOOK A FREE STRATEGY CALL
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
            <button
              onClick={() => scrollToSection("services")}
              className="inline-flex items-center gap-3 px-8 py-4 border border-[#f5f5f5]/20 text-[#f5f5f5] hover:border-[#e74c3c] hover:text-[#e74c3c] transition-all duration-300 type-cta"
            >
              EXPLORE SERVICES
            </button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 0.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[2] flex flex-col items-center gap-2"
        >
          <span className="section-label text-[10px]">SCROLL</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={16} className="text-[#e74c3c]" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── Stats ──────────────────────────────────────────────── */}
      <section
        id="results"
        className="py-16 md:py-20 px-6 bg-[#080808] border-y border-white/10"
      >
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <p className="section-label text-center mb-10">By The Numbers</p>
          </FadeUp>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {stats.map((stat, i) => (
              <FadeUp key={stat.label} delay={i * 0.1}>
                <div className="text-center group">
                  <div className="inline-flex items-center justify-center w-10 h-10 border border-[#e74c3c]/30 text-[#e74c3c] mb-4 group-hover:bg-[#e74c3c]/10 transition-colors">
                    {stat.icon}
                  </div>
                  <div className="font-display text-[clamp(2.5rem,6vw,4rem)] text-[#f5f5f5] leading-none mb-2">
                    <AnimatedCounter
                      target={stat.value}
                      suffix={stat.suffix}
                      prefix={stat.prefix}
                    />
                  </div>
                  <p className="text-xs font-mono-custom text-[#8a8a8a] tracking-widest uppercase">
                    {stat.label}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* Stats CTA strip */}
          <FadeUp delay={0.35}>
            <div className="mt-12 text-center">
              <p className="type-body-sm text-[#8a8a8a] mb-6">
                These results came from real enterprise engagements — not projections.
              </p>
              <a
                href={process.env.NEXT_PUBLIC_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-6 py-3 border border-[#e74c3c] text-[#e74c3c] hover:bg-[#e74c3c] hover:text-white transition-all duration-300 type-cta"
              >
                SEE HOW WE CAN DO THIS FOR YOU
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Products ───────────────────────────────────────────── */}
      <section id="products" className="py-16 md:py-20 px-6 bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <div className="mb-10">
              <p className="section-label mb-4">What We've Built</p>
              <h2 className="type-section text-[#f5f5f5]">
                SHIPPED <span className="text-[#e74c3c]">&amp; LIVE</span>
              </h2>
            </div>
          </FadeUp>

          <div className="space-y-16">
            {products.map((product, i) => (
              <FadeUp key={product.name} delay={i * 0.15}>
                <div
                  className={`grid md:grid-cols-2 gap-12 lg:gap-12 items-center ${
                    i % 2 === 1 ? "md:grid-flow-dense" : ""
                  }`}
                >
                  {/* Text */}
                  <div className={i % 2 === 1 ? "md:col-start-1" : ""}>
                    <p className="section-label mb-4">{product.label}</p>
                    <h3 className="type-card-heading text-[#f5f5f5] mb-2">
                      {product.name.toUpperCase()}
                    </h3>
                    <p className="text-[#e74c3c] type-cta mb-3">
                      {product.tagline}
                    </p>
                    <p className="text-[#999999] leading-relaxed mb-4">
                      {product.description}
                    </p>

                    <ul className="space-y-2.5 mb-6">
                      {product.features.map((feat) => (
                        <li
                          key={feat}
                          className="flex items-start gap-3 type-body-sm text-[#999999]"
                        >
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-[#e74c3c] flex-shrink-0" />
                          {feat}
                        </li>
                      ))}
                    </ul>

                    <a
                      href={product.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-3 px-6 py-3 border border-[#e74c3c] text-[#e74c3c] hover:bg-[#e74c3c] hover:text-white transition-all duration-300 type-cta"
                    >
                      VISIT {product.name.toUpperCase()}
                      <ExternalLink
                        size={14}
                        className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                      />
                    </a>
                  </div>

                  {/* Visual */}
                  <div className={i % 2 === 1 ? "md:col-start-2" : ""}>
                    {product.hasImage && product.image ? (
                      <a
                        href={product.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${product.name}`}
                        className="relative block aspect-video overflow-hidden border border-[#f5f5f5]/[0.08] group rounded-2xl"
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/60 to-transparent z-10" />
                        <Image
                          src={product.image}
                          alt={product.imageAlt || product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </a>
                    ) : (
                      <div className="relative aspect-video bg-[#111111] border border-white/10 overflow-hidden flex items-center justify-center group hover:border-[#e74c3c]/30 transition-colors duration-500 rounded-2xl">
                        {/* Decorative grid */}
                        <div
                          className="absolute inset-0 opacity-5"
                          style={{
                            backgroundImage:
                              "linear-gradient(#e74c3c 1px, transparent 1px), linear-gradient(90deg, #e74c3c 1px, transparent 1px)",
                            backgroundSize: "40px 40px",
                          }}
                        />
                        <div className="relative z-10 text-center">
                          <div className="font-display text-[clamp(3rem,8vw,5rem)] text-outline leading-none mb-2">
                            {product.name.split(" ")[0].toUpperCase()}
                          </div>
                          <p className="font-mono-custom text-xs text-[#8a8a8a] tracking-widest">
                            {product.tagline}
                          </p>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#e74c3c]/05 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                    )}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ───────────────────────────────────────────── */}
      <section id="services" className="py-16 md:py-20 px-6 bg-[#080808]">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <p className="section-label mb-4">What We Do</p>
                <h2 className="type-section text-[#f5f5f5]">
                  WHAT WE <span className="text-[#e74c3c]">BUILD</span>
                </h2>
              </div>
              <p className="max-w-md text-[#999999] leading-relaxed md:text-right">
                End-to-end solutions across the full AI and data spectrum, from
                automation pipelines to executive dashboards.
              </p>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 divide-x divide-y divide-dashed divide-white/10 border border-dashed border-white/10 bg-white/[0.02] backdrop-blur-sm rounded-2xl overflow-hidden">
            {services.map((service, i) => (
              <FadeUp key={service.title} delay={i * 0.12}>
                <div className="h-full">
                  <FeatureCard
                    feature={{
                      title: service.title.toUpperCase(),
                      icon: service.icon,
                      description: service.description,
                    }}
                  />
                  <ul className="px-6 pb-6 space-y-2">
                    {service.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-3 text-xs text-[#8a8a8a]">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-[#e74c3c] flex-shrink-0" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* Services CTA strip */}
          <FadeUp delay={0.2}>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/10 pt-10">
              <p className="text-[#999999] type-body-sm max-w-md">
                Not sure which service fits? Start with a free 30-min call — we&apos;ll scope it together.
              </p>
              <a
                href={process.env.NEXT_PUBLIC_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-6 py-3 border border-[#e74c3c] text-[#e74c3c] hover:bg-[#e74c3c] hover:text-white transition-all duration-300 type-cta whitespace-nowrap flex-shrink-0"
              >
                BOOK A FREE CALL
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Process ────────────────────────────────────────────── */}
      <section id="process" className="py-16 md:py-20 px-6 bg-[#0f0f0f]">
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <div className="mb-12">
              <p className="section-label mb-4">How We Work</p>
              <h2 className="type-section text-[#f5f5f5]">
                FROM FIRST CALL TO <span className="text-[#e74c3c]">LIVE IN PRODUCTION</span>
              </h2>
            </div>
          </FadeUp>

          <div className="grid md:grid-cols-4 gap-0 relative">
            {/* Connecting line — desktop only */}
            <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-white/10" />

            {[
              {
                step: "01",
                title: "Discovery Call",
                duration: "30 min · Free",
                description: "We understand your data landscape, tooling, pain points, and goals. No questionnaire. A real conversation.",
              },
              {
                step: "02",
                title: "Scope & Proposal",
                duration: "3–5 days",
                description: "A clear proposal with deliverables, tech stack, timeline, and pricing. No black boxes, no ambiguity.",
              },
              {
                step: "03",
                title: "Build & Iterate",
                duration: "Weekly check-ins",
                description: "Working software over documentation. You see progress every week. We adjust based on feedback in real time.",
              },
              {
                step: "04",
                title: "Deliver & Hand Off",
                duration: "Production-ready",
                description: "Deployed, documented, and handed over. Optional retainer for ongoing support, monitoring, or iteration.",
              },
            ].map((item, i) => (
              <FadeUp key={item.step} delay={i * 0.1}>
                <div className="relative flex flex-col items-center text-center px-6 py-8">
                  {/* Step number circle */}
                  <div className="relative z-10 w-16 h-16 rounded-full border border-[#e74c3c]/30 bg-[#0f0f0f] flex items-center justify-center mb-5">
                    <span className="font-mono-custom text-xs text-[#e74c3c] tracking-widest">{item.step}</span>
                  </div>
                  <p className="font-mono-custom text-[10px] text-[#e74c3c]/60 tracking-widest uppercase mb-2">{item.duration}</p>
                  <h3 className="type-sub-heading text-[#f5f5f5] mb-3">{item.title.toUpperCase()}</h3>
                  <p className="type-body-sm text-[#999999]">{item.description}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Us ─────────────────────────────────────────────── */}
      <section id="why-us" className="py-16 md:py-20 px-6 bg-[#0f0f0f]">
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <div className="mb-10">
              <p className="section-label mb-4">Why Choose Us</p>
              <h2 className="type-section text-[#f5f5f5] break-words">
                THE INFINI <br />
                <span className="text-[#e74c3c]">ADVANTAGE</span>
              </h2>
            </div>
          </FadeUp>

          <div className="space-y-10">
            {whyUs.map((item, i) => (
              <FadeUp key={item.num} delay={i * 0.08}>
                <div className="border-t border-white/10 pt-8">
                  <div className="flex items-baseline gap-4 mb-3">
                    <span className="font-mono-custom text-xs text-[#e74c3c]/50 tracking-widest flex-shrink-0">
                      {item.num}
                    </span>
                    <h3 className="type-sub-heading text-[#f5f5f5]">
                      {item.title.toUpperCase()}
                    </h3>
                  </div>
                  <p className="text-[#999999] leading-relaxed text-base pl-10">
                    {item.description}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tech Stack ─────────────────────────────────────────── */}
      <section id="stack" className="py-16 md:py-20 px-6 bg-[#080808]">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <div className="mb-10">
              <p className="section-label mb-4">Our Toolkit</p>
              <h2 className="type-section text-[#f5f5f5]">
                TECH <span className="text-[#e74c3c]">STACK</span>
              </h2>
            </div>
          </FadeUp>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {techStack.map((group, i) => (
              <FadeUp key={group.category} delay={i * 0.1}>
                <HighlightCard
                  title={group.category}
                  description={group.items}
                  icon={group.icon}
                />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ───────────────────────────────────────────────── */}
      <section id="team" className="py-16 md:py-20 px-6 bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <p className="section-label mb-4">The People</p>
                <h2 className="type-section text-[#f5f5f5]">
                  THE <span className="text-[#e74c3c]">FOUNDER</span>
                </h2>
              </div>
              <p className="font-mono-custom text-xs tracking-wider text-[#8a8a8a] md:text-right flex-shrink-0">
                Est. 2025 · Mumbai · Remote-First
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.15}>
            <div className="relative overflow-hidden border border-white/10 bg-gradient-to-br from-[#111111] to-[#0a0a0a] rounded-2xl">
              {/* Crimson glow accent */}
              <div className="absolute top-0 left-0 w-72 h-72 bg-[#e74c3c]/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#e74c3c]/5 rounded-full blur-3xl pointer-events-none" />

              <div className="grid md:grid-cols-[340px_1fr]">
                {/* Photo */}
                <div className="relative h-64 md:h-auto min-h-[420px] overflow-hidden">
                  <Image
                    src="/mukul-photo-2.jpg"
                    alt="Mukul Kulkarni, Founder of Infini Imaginator"
                    fill
                    className="object-cover object-top"
                    priority
                    sizes="(max-width: 768px) 100vw, 340px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#111111] hidden md:block" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/40 to-transparent md:hidden" />
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 flex flex-col justify-center relative z-10">
                  {/* Name + title */}
                  <div className="mb-4">
                    <h3 className="type-card-heading text-[#f5f5f5] mb-2">
                      MUKUL KULKARNI
                    </h3>
                    <p className="font-mono-custom text-xs text-[#e74c3c] tracking-[0.25em] uppercase">
                      Founder &amp; Principal Consultant
                    </p>
                  </div>

                  {/* Bio */}
                  <div className="border-l-2 border-[#e74c3c] pl-4 mb-5 space-y-2.5">
                    <p className="text-[#cccccc] type-body-sm">
                      I started at <strong className="text-[#f5f5f5]">Accenture India</strong>, building 111 ETL pipelines across enterprise data landscapes. After moving to the US, I completed my <strong className="text-[#f5f5f5]">MS in Information Systems</strong> (Data &amp; BI focus) at Pace University.
                    </p>
                    <p className="text-[#cccccc] type-body-sm">
                      At <strong className="text-[#f5f5f5]">Embrace Home Loans</strong>, I managed 500+ SSRS BI reports and dashboards (50+ built from scratch), partnered with the VP of Operations on an initiative uncovering <strong className="text-[#f5f5f5]">$500K in tolerance cures</strong>, and designed 6 executive command centre dashboards on live TV screens, contributing to 25% faster loan processing.
                    </p>
                    <p className="text-[#999999] type-body-sm">
                      Today I run <strong className="text-[#e74c3c]">Infini Imaginator</strong>, where enterprise depth meets AI-augmented execution. I use AI as a pair programmer to move fast, human judgment to decide wisely, and best practices to make it last. <span className="text-[#cccccc] italic">&ldquo;I don&apos;t consult with slide decks. I build alongside you.&rdquo;</span>
                    </p>
                  </div>

                  {/* Credential tiles */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                    {[
                      { label: "Experience", value: "9+ Years" },
                      { label: "Degree", value: "MS Info Systems" },
                      { label: "University", value: "Pace University" },
                      { label: "GPA", value: "3.88 / 4.0" },
                    ].map((item) => (
                      <div key={item.label} className="bg-white/5 border border-white/10 p-2.5 hover:border-[#e74c3c]/30 transition-colors duration-300">
                        <div className="text-[9px] font-mono-custom text-[#8a8a8a] tracking-widest uppercase mb-0.5">
                          {item.label}
                        </div>
                        <div className="text-xs text-[#f5f5f5] font-medium leading-snug">{item.value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Previously at */}
                  <div className="mb-5">
                    <p className="text-[9px] font-mono-custom text-[#8a8a8a] tracking-widest uppercase mb-2">Previously at</p>
                    <div className="flex flex-wrap gap-2">
                      {["Accenture", "Embrace Home Loans"].map((company) => (
                        <span key={company} className="px-2.5 py-0.5 border border-white/10 text-xs text-[#999999] font-mono-custom tracking-wide">
                          {company}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="flex gap-4 flex-wrap">
                    <a
                      href="mailto:business@imaginator.in"
                      aria-label="Email Mukul Kulkarni"
                      className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#e74c3c] text-[#e74c3c] hover:bg-[#e74c3c] hover:text-white transition-all duration-300 type-cta"
                    >
                      <Mail size={14} /> EMAIL
                    </a>
                    <a
                      href="https://www.linkedin.com/in/mukul-kulkarni/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Mukul Kulkarni on LinkedIn (opens in new tab)"
                      className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/20 text-[#999999] hover:border-[#e74c3c] hover:text-[#e74c3c] transition-all duration-300 type-cta"
                    >
                      <Linkedin size={14} /> LINKEDIN
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────── */}
      <section id="faq" className="py-16 md:py-20 px-6 bg-[#0f0f0f]">
        <div className="max-w-3xl mx-auto">
          <FadeUp>
            <div className="mb-12 text-center">
              <p className="section-label mb-4">Common Questions</p>
              <h2 className="type-section text-[#f5f5f5]">
                FREQUENTLY ASKED <span className="text-[#e74c3c]">QUESTIONS</span>
              </h2>
            </div>
          </FadeUp>

          <FaqAccordion />
        </div>
      </section>

      {/* ── Contact ────────────────────────────────────────────── */}
      <section
        id="contact"
        className="relative py-16 md:py-20 px-6 bg-[#080808] overflow-hidden"
      >
        {/* BackgroundPaths behind content */}
        <BackgroundPaths />

        {/* Gradient overlay — thin enough that paths show through the full section */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/40 via-[#080808]/10 to-[#080808]/60 z-[1]" />

        <div className="relative z-[2] max-w-5xl mx-auto text-center">
          <FadeUp>
            <p className="section-label mb-6">Get In Touch</p>
            <h2 className="font-display text-[clamp(2.5rem,7vw,6rem)] leading-none text-[#f5f5f5] mb-6">
              LET&apos;S BUILD YOUR{" "}
              <span className="text-[#e74c3c]">AI-POWERED</span> FUTURE
            </h2>
            <p className="text-[#999999] text-lg leading-relaxed max-w-2xl mx-auto mb-4">
              Whether you need to automate a workflow, build executive dashboards, or rethink your data
              strategy. We bring enterprise depth, AI-augmented speed, and the judgment to get it right.
              Let&apos;s start with a conversation.
            </p>
            <p className="font-mono-custom text-xs text-[#e74c3c]/80 tracking-wider mb-10">
              NO COMMITMENT · NO SALES PRESSURE · JUST A CONVERSATION
            </p>
          </FadeUp>

          <FadeUp delay={0.15}>
            <div className="grid sm:grid-cols-3 gap-6 mb-10 max-w-2xl mx-auto">
              <div className="bg-[#111111]/80 backdrop-blur-sm border border-white/10 p-6 text-center rounded-2xl">
                <Mail size={20} className="text-[#e74c3c] mx-auto mb-3" />
                <p className="font-mono-custom text-[10px] tracking-widest text-[#8a8a8a] uppercase mb-2">
                  Email
                </p>
                <a
                  href="mailto:business@imaginator.in"
                  className="text-sm text-[#f5f5f5] hover:text-[#e74c3c] transition-colors break-all"
                >
                  business@imaginator.in
                </a>
              </div>

              <div className="bg-[#111111]/80 backdrop-blur-sm border border-white/10 p-6 text-center rounded-2xl">
                <Linkedin size={20} className="text-[#e74c3c] mx-auto mb-3" />
                <p className="font-mono-custom text-[10px] tracking-widest text-[#8a8a8a] uppercase mb-2">
                  LinkedIn
                </p>
                <a
                  href="https://www.linkedin.com/in/mukul-kulkarni/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#f5f5f5] hover:text-[#e74c3c] transition-colors"
                >
                  /in/mukul-kulkarni
                </a>
              </div>

              <div className="bg-[#111111]/80 backdrop-blur-sm border border-white/10 p-6 text-center rounded-2xl">
                <Clock size={20} className="text-[#e74c3c] mx-auto mb-3" />
                <p className="font-mono-custom text-[10px] tracking-widest text-[#8a8a8a] uppercase mb-2">
                  Response Time
                </p>
                <p className="text-sm text-[#f5f5f5]">Within 24 hours</p>
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.25}>
            <a
              href={process.env.NEXT_PUBLIC_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-4 px-10 py-5 bg-[#e74c3c] text-white hover:bg-[#f05a46] transition-all duration-300 type-cta"
            >
              BOOK A FREE 30-MIN CALL
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
          </FadeUp>

        </div>
      </section>

      </main>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <footer className="bg-[#080808] border-t border-white/10 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="font-mono-custom text-sm font-bold tracking-widest text-[#8a8a8a]">
            <span className="inline-flex items-center gap-2.5">
              <svg width="16" height="16" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <rect x="9" y="7" width="3.5" height="18" rx="1" transform="rotate(15 9 7)" fill="#C0392B"/>
                <rect x="18" y="7" width="3.5" height="18" rx="1" transform="rotate(15 18 7)" fill="#C0392B"/>
              </svg>
              INFINI IMAGINATOR
            </span>
          </div>

          <p className="font-mono-custom text-xs text-[#8a8a8a] tracking-wider text-center">
            &copy; {new Date().getFullYear()} Infini Imaginator. All rights reserved.
          </p>

          <div className="flex gap-6">
            <a
              href="mailto:business@imaginator.in"
              className="p-3 -m-3 text-[#8a8a8a] hover:text-[#e74c3c] transition-colors"
              aria-label="Email"
            >
              <Mail size={16} />
            </a>
            <a
              href="https://www.linkedin.com/in/mukul-kulkarni/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 -m-3 text-[#8a8a8a] hover:text-[#e74c3c] transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
