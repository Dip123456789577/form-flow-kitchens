import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  DraftingCompass,
  Gem,
  Hammer,
  Layers,
  Lightbulb,
  Paintbrush,
  Ruler,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";
import heroImage from "@/assets/forma-hero.jpg";
import darkKitchen from "@/assets/forma-dark-kitchen.jpg";
import lightKitchen from "@/assets/forma-light-kitchen.jpg";
import detailImage from "@/assets/forma-detail.jpg";
import beforeOak from "@/assets/forma-before.jpg";
import afterOak from "@/assets/forma-after.jpg";
import beforeFamily from "@/assets/forma-family-before.jpg";
import afterFamily from "@/assets/forma-family-after.jpg";
import beforeMinimal from "@/assets/forma-minimal-before.jpg";
import afterMinimal from "@/assets/forma-minimal-after.jpg";
import { Button } from "@/components/ui/button";
import { CTASection, SectionHeading } from "@/components/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kitchen Renovation & Remodeling | FORMA Kitchen Studio" },
      {
        name: "description",
        content:
          "Premium kitchen renovation, remodeling and custom kitchen design. Beautiful kitchens designed around how you live.",
      },
      {
        property: "og:title",
        content: "Kitchen Renovation & Remodeling | FORMA Kitchen Studio",
      },
      {
        property: "og:description",
        content:
          "Premium kitchen renovation, remodeling and custom kitchen design. Beautiful spaces designed around how you live.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const services = [
  {
    num: "01",
    title: "Full Kitchen Renovation",
    text: "From demolition to final installation, we manage every part of your transformation with exacting standards.",
    image: heroImage,
    icon: Hammer,
  },
  {
    num: "02",
    title: "Custom Cabinetry",
    text: "Storage designed around your space, your routines and the way you use your kitchen every single day.",
    image: detailImage,
    icon: Ruler,
  },
  {
    num: "03",
    title: "Kitchen Design",
    text: "Thoughtful layouts, materials and finishes brought together into one cohesive, functional design.",
    image: lightKitchen,
    icon: DraftingCompass,
  },
  {
    num: "04",
    title: "Countertops & Surfaces",
    text: "Beautiful, durable surfaces selected to balance everyday performance with timeless architectural style.",
    image: darkKitchen,
    icon: Gem,
  },
  {
    num: "05",
    title: "Lighting & Electrical",
    text: "Layered lighting and carefully planned electrical details that make the kitchen work beautifully day and night.",
    image: heroImage,
    icon: Lightbulb,
  },
  {
    num: "06",
    title: "Finishing Details",
    text: "Flooring, fixtures, hardware and final details that complete the room with refined tactile quality.",
    image: detailImage,
    icon: Paintbrush,
  },
];

const transformationProjects = [
  {
    id: "oak-stone",
    title: "Oak & Stone Kitchen",
    subtitle: "PROJECT 01",
    description:
      "A complete redesign that opened the room, improved storage and introduced a warmer, more timeless material palette.",
    beforeImg: beforeOak,
    afterImg: afterOak,
    stats: { timeframe: "9 Weeks", scope: "Full Reconfiguration", surface: "Honed Quartzite" },
  },
  {
    id: "modern-family",
    title: "Modern Family Kitchen",
    subtitle: "PROJECT 02",
    description:
      "Removed claustrophobic 1990s partition walls to create a generous central island, fluted walnut millwork, and effortless breakfast seating.",
    beforeImg: beforeFamily,
    afterImg: afterFamily,
    stats: { timeframe: "11 Weeks", scope: "Open Concept Expansion", surface: "Calacatta Gold" },
  },
  {
    id: "warm-minimal",
    title: "Warm Minimal Kitchen",
    subtitle: "PROJECT 03",
    description:
      "Transformed a dark, confined galley kitchen into a serene architectural space with seamless oak cabinetry, limewash walls, and honed travertine.",
    beforeImg: beforeMinimal,
    afterImg: afterMinimal,
    stats: {
      timeframe: "8 Weeks",
      scope: "Bespoke Millwork & Layout",
      surface: "Beige Travertine",
    },
  },
];

const featuredProjects = [
  {
    title: "Oak & Stone Residence",
    category: "Full Architecture & Remodel",
    description: "Generous island proportions, rift-sawn oak, and custom brass shadow lines.",
    image: darkKitchen,
    classSpan: "project-1",
  },
  {
    title: "Modern Family Kitchen",
    category: "Open Concept Reconfiguration",
    description: "Designed for effortless morning routines and relaxed evening hosting.",
    image: heroImage,
    classSpan: "project-2",
  },
  {
    title: "Marble & Brass Kitchen",
    category: "Custom Cabinetry & Surfaces",
    description:
      "Quiet fluted cabinetry balanced by expressive natural stone and patinated hardware.",
    image: detailImage,
    classSpan: "project-3",
  },
  {
    title: "Warm Minimal Kitchen",
    category: "Monolithic Stone & Lighting",
    description: "A calm, light-filled space centered on raw materials and continuous sightlines.",
    image: lightKitchen,
    classSpan: "project-4",
  },
];

const processSteps = [
  {
    step: "01",
    title: "DISCOVER",
    text: "We listen to how you live, what isn't working and what you want your kitchen to become.",
  },
  {
    step: "02",
    title: "DESIGN",
    text: "We develop the layout, materials, finishes and details into one cohesive plan.",
  },
  {
    step: "03",
    title: "BUILD",
    text: "Our team manages the renovation carefully, keeping quality, communication and craftsmanship at the center.",
  },
  {
    step: "04",
    title: "REVEAL",
    text: "Every detail is finished, checked and refined before your new kitchen is ready to live in.",
  },
];

function InteractiveBeforeAfter() {
  const [activeTab, setActiveTab] = useState(0);
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const currentProject = transformationProjects[activeTab] ?? transformationProjects[0]!;

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(3, Math.min(97, (x / rect.width) * 100));
    setPosition(percentage);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    handleMove(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    isDragging.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {
      // ignore
    }
  };

  return (
    <div className="comparison-wrap">
      {/* Project Switcher Tabs */}
      <div className="flex flex-wrap items-center justify-between border-b border-border bg-surface px-6 py-3.5 gap-4">
        <div className="flex flex-wrap gap-2 sm:gap-3" role="tablist">
          {transformationProjects.map((p, idx) => (
            <button
              key={p.id}
              role="tab"
              aria-selected={activeTab === idx}
              onClick={() => {
                setActiveTab(idx);
                setPosition(50);
              }}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-all border ${
                activeTab === idx
                  ? "border-accent bg-background text-foreground shadow-xs"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:bg-background/50"
              }`}
            >
              {p.title}
            </button>
          ))}
        </div>
        <span className="hidden sm:inline-block text-xs uppercase tracking-wider text-muted-foreground">
          Drag divider to inspect
        </span>
      </div>

      {/* The Visual Comparison Container */}
      <div
        ref={containerRef}
        className="comparison"
        style={{ "--split": `${position}%` } as React.CSSProperties}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        {/* AFTER (Base) */}
        <img
          src={currentProject.afterImg}
          alt={`${currentProject.title} After Renovation`}
          loading="lazy"
        />

        {/* BEFORE (Clipped layer) */}
        <div className="comparison-before">
          <img
            src={currentProject.beforeImg}
            alt={`${currentProject.title} Before Renovation`}
            loading="lazy"
          />
        </div>

        {/* Labels */}
        <span className="comparison-label comparison-label-before">Before</span>
        <span className="comparison-label comparison-label-after">After</span>

        {/* Divider Line & Circular Handle */}
        <div className="comparison-line">
          <div className="comparison-handle" aria-hidden="true">
            <span className="text-base font-bold select-none">↔</span>
          </div>
        </div>

        {/* Accessible Range Input Fallback */}
        <input
          type="range"
          min="3"
          max="97"
          value={position}
          onChange={(e) => setPosition(Number(e.target.value))}
          aria-label={`Drag to compare before and after for ${currentProject.title}`}
        />
      </div>

      {/* Project Meta Information Footer */}
      <div className="grid gap-6 border-t border-border bg-card p-6 sm:p-8 lg:grid-cols-[1.4fr_1fr] items-center">
        <div>
          <p className="eyebrow">{currentProject.subtitle}</p>
          <h3 className="mt-1 font-serif text-2xl sm:text-3xl font-normal text-foreground">
            {currentProject.title}
          </h3>
          <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-muted-foreground">
            {currentProject.description}
          </p>
        </div>
        <div className="grid grid-cols-3 gap-3 border-t border-border pt-4 sm:pt-0 sm:border-t-0 sm:border-l sm:pl-8 text-xs">
          <div>
            <span className="block text-[10px] uppercase tracking-wider text-muted-foreground">
              Duration
            </span>
            <span className="font-semibold text-foreground mt-0.5 block">
              {currentProject.stats.timeframe}
            </span>
          </div>
          <div>
            <span className="block text-[10px] uppercase tracking-wider text-muted-foreground">
              Scope
            </span>
            <span className="font-semibold text-foreground mt-0.5 block">
              {currentProject.stats.scope}
            </span>
          </div>
          <div>
            <span className="block text-[10px] uppercase tracking-wider text-muted-foreground">
              Key Surface
            </span>
            <span className="font-semibold text-foreground mt-0.5 block">
              {currentProject.stats.surface}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCounter({
  value,
  suffix = "",
  label,
}: {
  value: number;
  suffix?: string;
  label: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry || !entry.isIntersecting) return;
        const start = performance.now();
        const duration = 1200;
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / duration);
          // Ease-out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(value * eased));
          if (progress < 1) {
            requestAnimationFrame(tick);
          }
        };
        requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.3 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="border-l-2 border-accent/40 pl-6 py-2">
      <p className="font-serif text-5xl sm:text-6xl text-hero-foreground font-normal tracking-tight">
        {count}
        {suffix}
      </p>
      <p className="mt-3 text-xs uppercase tracking-[0.18em] text-hero-foreground/75 font-medium">
        {label}
      </p>
    </div>
  );
}

function HomePage() {
  return (
    <>
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="hero-section">
        <img
          src={heroImage}
          alt="Luxury contemporary kitchen designed by FORMA Kitchen Studio with warm oak cabinetry and marble island"
          width={1920}
          height={1200}
          className="absolute inset-0 h-full w-full object-cover object-center"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-hero-overlay" />

        <div className="shell relative z-10 flex min-h-[94svh] items-end pb-16 pt-32 sm:pb-24 lg:pb-28">
          <div className="max-w-4xl text-hero-foreground">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 border border-white/20 bg-white/10 px-3.5 py-1.5 backdrop-blur-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-hero-foreground">
                KITCHEN DESIGN • RENOVATION • CRAFTSMANSHIP
              </p>
            </div>

            {/* Main Headline */}
            <h1 className="mt-6 font-serif text-[clamp(2.8rem,7vw,6.5rem)] font-normal leading-[0.94] tracking-tight text-hero-foreground">
              Your Kitchen Should Work Beautifully.
            </h1>

            {/* Supporting Copy */}
            <p className="mt-6 max-w-2xl text-base sm:text-lg lg:text-xl leading-relaxed text-hero-foreground/85">
              We transform outdated kitchens into thoughtful, beautiful spaces designed around the
              way you actually live.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center">
              <Button asChild variant="light" size="default">
                <Link to="/contact">Book a Free Consultation</Link>
              </Button>
              <Button asChild variant="outline" size="default">
                <a href="#transformations">See Our Transformations</a>
              </Button>
            </div>

            {/* Small Trust Points */}
            <div className="mt-12 grid max-w-2xl grid-cols-3 gap-4 border-t border-hero-foreground/20 pt-6 text-[10px] sm:text-xs uppercase tracking-[0.16em] text-hero-foreground/80 font-medium">
              <div className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-accent" />
                <span>Custom Designed</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-accent" />
                <span>Expert Craftsmanship</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-accent" />
                <span>Fully Managed</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST BAR */}
      <section className="trust-bar py-8 sm:py-12 bg-background border-b border-border">
        <div className="shell">
          <div className="mb-8 max-w-2xl">
            <p className="eyebrow">The FORMA Standard</p>
            <h2 className="mt-2 font-serif text-2xl sm:text-3xl font-normal text-foreground">
              Beautiful Design. Thoughtful Craftsmanship. One Seamless Process.
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="trust-item border border-border p-6 bg-card">
              <DraftingCompass size={24} strokeWidth={1.3} className="text-accent shrink-0 mt-1" />
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground">
                  CUSTOM DESIGN
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Every kitchen starts with your needs, habits, and spatial geometry.
                </p>
              </div>
            </div>

            <div className="trust-item border border-border p-6 bg-card">
              <Gem size={24} strokeWidth={1.3} className="text-accent shrink-0 mt-1" />
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground">
                  QUALITY MATERIALS
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Beautiful finishes, stones, and hardware selected to last generations.
                </p>
              </div>
            </div>

            <div className="trust-item border border-border p-6 bg-card">
              <ShieldCheck size={24} strokeWidth={1.3} className="text-accent shrink-0 mt-1" />
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground">
                  EXPERT CRAFTSMANSHIP
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Careful execution down to the smallest shadow line and joinery detail.
                </p>
              </div>
            </div>

            <div className="trust-item border border-border p-6 bg-card">
              <Users size={24} strokeWidth={1.3} className="text-accent shrink-0 mt-1" />
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground">
                  FULL PROJECT MANAGEMENT
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  One dedicated team from first idea to final reveal and walkthrough.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SERVICES */}
      <section className="section-space bg-surface">
        <div className="shell">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end mb-14">
            <div>
              <p className="eyebrow">Comprehensive Expertise</p>
              <h2 className="section-title mt-3">Everything Your Kitchen Needs. In One Place.</h2>
            </div>
            <p className="section-copy">
              From the first layout to the final handle, we bring design, craftsmanship and project
              management together under one roof.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map(({ num, title, text, image, icon: Icon }) => (
              <article key={title} className="service-card group">
                <div className="service-img-wrap">
                  <img src={image} alt={`${title} by FORMA Kitchen Studio`} loading="lazy" />
                  <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-xs px-2.5 py-1 text-[11px] font-semibold tracking-widest text-foreground uppercase border border-border">
                    {num}
                  </div>
                </div>
                <div className="p-7 flex-1 flex flex-col justify-between bg-card">
                  <div>
                    <div className="flex items-center justify-between">
                      <Icon size={22} strokeWidth={1.3} className="text-accent" />
                    </div>
                    <h3 className="mt-5 font-serif text-2xl font-normal text-foreground group-hover:text-accent transition-colors">
                      {title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
                  </div>
                  <div className="mt-6 pt-5 border-t border-border flex items-center justify-between text-xs font-semibold uppercase tracking-[0.12em] text-foreground group-hover:text-accent transition-colors">
                    <span>Learn More</span>
                    <ArrowRight
                      size={14}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. BEFORE / AFTER TRANSFORMATION SECTION */}
      <section
        id="transformations"
        className="section-space scroll-mt-20 bg-background border-y border-border"
      >
        <div className="shell">
          <div className="max-w-3xl mb-12">
            <p className="eyebrow">Real Before / After Proof</p>
            <h2 className="section-title mt-3">See the Transformation.</h2>
            <p className="section-copy mt-4">
              Great renovation isn't about changing everything. It's about knowing what to
              change—and doing it beautifully.
            </p>
          </div>

          <InteractiveBeforeAfter />
        </div>
      </section>

      {/* 5. FEATURED PROJECTS PORTFOLIO */}
      <section className="section-space bg-surface">
        <div className="shell">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="eyebrow">Curated Portfolio</p>
              <h2 className="section-title mt-3">Kitchens We've Transformed.</h2>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              Each space is a tailored response to its architecture, natural light, and the family
              who gathers within it.
            </p>
          </div>

          <div className="portfolio-grid">
            {featuredProjects.map((project) => (
              <article key={project.title} className={`project-card ${project.classSpan} group`}>
                <img src={project.image} alt={project.title} loading="lazy" />
                <div className="project-overlay">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-semibold block mb-1">
                      {project.category}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-hero-foreground font-normal">
                      {project.title}
                    </h3>
                    <p className="mt-2 max-w-sm text-xs sm:text-sm text-hero-foreground/80 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                  <div className="project-arrow p-3 rounded-full border border-white/20 bg-white/10 backdrop-blur-xs text-hero-foreground">
                    <ArrowRight size={18} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PROCESS */}
      <section className="section-space bg-background">
        <div className="shell">
          <SectionHeading
            eyebrow="The Renovation Journey"
            title="From First Idea to Final Reveal."
            copy="A transparent, beautifully coordinated 4-step framework ensures complete peace of mind at every turn."
          />

          <div className="mt-14 grid border-y border-border sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map(({ step, title, text }) => (
              <article key={step} className="process-step">
                <span className="font-serif text-4xl sm:text-5xl text-accent font-light block">
                  {step}
                </span>
                <h3 className="mt-10 text-base font-semibold uppercase tracking-[0.14em] text-foreground">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 7. STATS SECTION (Sophisticated Dark Background) */}
      <section className="bg-primary py-20 text-hero-foreground">
        <div className="shell">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <StatCounter value={150} suffix="+" label="Kitchens Transformed" />
            <StatCounter value={10} suffix="+" label="Years of Experience" />
            <StatCounter value={98} suffix="%" label="Client Satisfaction" />
            <StatCounter value={1} label="Dedicated Project Team" />
          </div>
          <p className="mt-10 text-[11px] uppercase tracking-wider text-hero-foreground/45 border-t border-hero-foreground/15 pt-6">
            Illustrative studio records for FORMA Kitchen Studio. Verified craft milestones
            available upon request.
          </p>
        </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <section className="section-space bg-surface">
        <div className="shell">
          <SectionHeading
            eyebrow="Client Stories"
            title="Designed Around Real Lives."
            copy="Hear how a thoughtfully planned kitchen changes the way homeowners feel every morning and evening."
          />

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            <article className="border border-border bg-card p-8 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="flex gap-1 text-accent" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <blockquote className="mt-6 font-serif text-xl sm:text-2xl font-normal leading-relaxed text-foreground">
                  “Our kitchen feels completely different—not just more beautiful, but so much
                  easier to live in. The team understood what we needed from the very beginning.”
                </blockquote>
              </div>
              <div className="mt-8 pt-6 border-t border-border">
                <p className="text-sm font-semibold text-foreground">Lauren & Jay Kim</p>
                <p className="mt-0.5 text-xs uppercase tracking-[0.12em] text-accent font-medium">
                  Full Kitchen Renovation · Oak Residence
                </p>
              </div>
            </article>

            <article className="border border-border bg-card p-8 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="flex gap-1 text-accent" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <blockquote className="mt-6 font-serif text-xl sm:text-2xl font-normal leading-relaxed text-foreground">
                  “We always knew what was happening next. The millwork and craftsmanship are
                  remarkable, and the small details are what make the room feel so resolved.”
                </blockquote>
              </div>
              <div className="mt-8 pt-6 border-t border-border">
                <p className="text-sm font-semibold text-foreground">Mara Whitfield</p>
                <p className="mt-0.5 text-xs uppercase tracking-[0.12em] text-accent font-medium">
                  Custom Cabinetry & Island · Modern Minimal
                </p>
              </div>
            </article>

            <article className="border border-border bg-card p-8 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="flex gap-1 text-accent" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <blockquote className="mt-6 font-serif text-xl sm:text-2xl font-normal leading-relaxed text-foreground">
                  “They found space and light we didn’t know we had. Morning routines are calmer,
                  entertaining is effortless, and the kitchen finally belongs to our home.”
                </blockquote>
              </div>
              <div className="mt-8 pt-6 border-t border-border">
                <p className="text-sm font-semibold text-foreground">Nina & Sam Brooks</p>
                <p className="mt-0.5 text-xs uppercase tracking-[0.12em] text-accent font-medium">
                  Kitchen Design & Surfaces · Marble & Brass
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* 9. FINAL CINEMATIC CTA */}
      <CTASection
        image={darkKitchen}
        title="Ready to Love Your Kitchen Again?"
        subtitle="Tell us what isn’t working, what you’re imagining, or simply where you’d like to begin. We’ll take it from there."
      />
    </>
  );
}
