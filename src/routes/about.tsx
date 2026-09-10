import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle,
  Compass,
  Hammer,
  Layers,
  Lightbulb,
  MessageSquare,
  Shield,
  Sparkles,
  Wrench,
} from "lucide-react";
import heroImage from "@/assets/forma-light-kitchen.jpg";
import darkKitchen from "@/assets/forma-dark-kitchen.jpg";
import detailImage from "@/assets/forma-detail.jpg";
import team1 from "@/assets/forma-team-1.jpg";
import team2 from "@/assets/forma-team-2.jpg";
import { Button } from "@/components/ui/button";
import { CTASection, SectionHeading } from "@/components/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About FORMA Kitchen Studio | Premium Architectural Renovations" },
      {
        name: "description",
        content:
          "Meet the design-led team behind FORMA Kitchen Studio. Discover our thoughtful philosophy, bespoke craftsmanship, and transparent end-to-end renovation process.",
      },
      { property: "og:title", content: "About FORMA Kitchen Studio" },
      {
        property: "og:description",
        content:
          "Thoughtful design, master craftsmanship and one carefully managed kitchen renovation process.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const differentiators = [
  {
    num: "01",
    title: "Design-Led Thinking",
    description:
      "We never force generic templates. Every space begins with spatial analysis, sightlines, natural daylight, and the way your family naturally moves.",
  },
  {
    num: "02",
    title: "Detailed Planning",
    description:
      "Millimeter-accurate technical drafts, transparent material schedules, and pre-construction site reviews prevent costly surprises during construction.",
  },
  {
    num: "03",
    title: "Quality Materials",
    description:
      "We source sustainably harvested hardwoods, solid quartz and natural marble slabs, heavy cast brass hardware, and commercial-grade drawer mechanisms.",
  },
  {
    num: "04",
    title: "Experienced Craftsmen",
    description:
      "Our carpenters, stone fabricators, and licensed electricians possess decades of dedicated high-end residential renovation expertise.",
  },
  {
    num: "05",
    title: "Clear Communication",
    description:
      "Weekly milestone reports, dedicated direct messaging with your project lead, and zero ambiguity regarding progress or schedules.",
  },
  {
    num: "06",
    title: "End-to-End Management",
    description:
      "One accountable partner handling architecture, permits, procurement, demolition, construction, and final architectural detailing.",
  },
];

const approachSteps = [
  {
    step: "01",
    name: "Listen",
    detail:
      "We explore your household's daily routines, culinary habits, storage frustrations, and aesthetic aspirations.",
  },
  {
    step: "02",
    name: "Plan",
    detail:
      "We evaluate structural considerations, mechanical routing, lighting layouts, and precise spatial ergonomics.",
  },
  {
    step: "03",
    name: "Design",
    detail:
      "We formulate comprehensive 3D material renderings, cabinet elevations, stone selections, and fixture schedules.",
  },
  {
    step: "04",
    name: "Build",
    detail:
      "Our master craftspeople execute with meticulous care, site protection, dust containment, and rigorous quality audits.",
  },
  {
    step: "05",
    name: "Refine",
    detail:
      "Every drawer alignment, caulking seam, and surface seal is inspected and perfected before your final handover walkthrough.",
  },
];

const craftsmanshipDisciplines = [
  {
    title: "Cabinetry & Joinery",
    copy: "Dovetail solid wood drawer boxes, whisper-quiet soft-close European hinges, and custom veneer matching across every door grain.",
  },
  {
    title: "Stone & Slabs",
    copy: "Mitered waterfall edges, seamless bookmatching, custom integrated stone sinks, and impenetrable invisible protective sealers.",
  },
  {
    title: "Architectural Hardware",
    copy: "Solid unlacquered brass, forged bronze, and machined tactile handles that develop an authentic patina with everyday handling.",
  },
  {
    title: "Layered Lighting",
    copy: "Concealed 2700K warm under-cabinet task LEDs, architectural ceiling coves, and statement designer pendants on independent dimmer circuits.",
  },
  {
    title: "Flooring & Transitions",
    copy: "Flush-set wide plank engineered oak, herringbone detailing, and flush threshold transitions between kitchen and adjacent living rooms.",
  },
  {
    title: "Finishing Details",
    copy: "Precision silicone joints, acoustic dampening liners, custom cutlery organizers, and hidden outlet strips tucked beneath upper millwork.",
  },
];

const teamMembers = [
  {
    name: "Elena Vance",
    role: "Principal Architect & Creative Director",
    image: team1,
    credential: "M.Arch · 14 Years Experience",
  },
  {
    name: "Marcus Keller",
    role: "Master Joiner & Technical Director",
    image: team2,
    credential: "Guild Certified · 18 Years Experience",
  },
];

function AboutPage() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="page-hero">
        <img
          src={heroImage}
          alt="Natural daylight in custom kitchen designed by FORMA Kitchen Studio"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="shell relative z-10 flex min-h-[78svh] items-end pb-16 pt-36 text-hero-foreground">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 border border-white/20 bg-white/10 px-3.5 py-1.5 backdrop-blur-xs mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-hero-foreground">
                ABOUT FORMA KITCHEN STUDIO
              </p>
            </div>
            <h1 className="font-serif text-[clamp(2.8rem,7vw,6.2rem)] font-normal leading-[0.96] tracking-tight text-hero-foreground">
              Good Design Starts With Listening.
            </h1>
            <p className="mt-6 max-w-2xl text-base sm:text-lg lg:text-xl leading-relaxed text-hero-foreground/85">
              We believe the best kitchens aren't designed for photographs. They're designed for
              real life.
            </p>
          </div>
        </div>
      </section>

      {/* 01 — OUR STORY */}
      <section className="section-space bg-background border-b border-border">
        <div className="shell grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 items-start">
          <div>
            <p className="eyebrow">01 — Our Story</p>
            <h2 className="section-title mt-4">A studio built around better decisions.</h2>
          </div>
          <div className="space-y-6 text-base leading-relaxed text-muted-foreground">
            <p>
              FORMA Kitchen Studio was founded on a simple, enduring conviction: a kitchen
              renovation should never feel like an unguided ordeal of disjointed trades, vague
              estimates, and compromises.
            </p>
            <p>
              Too many homeowners found themselves stuck in the middle—hiring an interior designer
              who had little on-site trade experience, or hiring a general builder who lacked
              architectural sensibility and aesthetic refinement.
            </p>
            <p>
              We unified both worlds. FORMA combines an architectural design studio with an in-house
              cabinetry workshop and dedicated project management. From initial sketches to the
              final wipe-down, your renovation is guided by one cohesive vision and one standard of
              excellence.
            </p>
            <blockquote className="border-l-2 border-accent pl-6 py-2 font-serif text-2xl sm:text-3xl text-foreground font-normal italic leading-snug">
              “When design and craftsmanship share the same table, the resulting kitchen feels
              effortlessly natural to live in.”
            </blockquote>
          </div>
        </div>
      </section>

      {/* 02 — OUR PHILOSOPHY */}
      <section className="bg-surface border-b border-border">
        <div className="shell grid lg:grid-cols-2 items-center">
          <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full min-h-[460px] overflow-hidden">
            <img
              src={darkKitchen}
              alt="Handcrafted dark walnut FORMA kitchen with integrated lighting"
              width={1400}
              height={1000}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div className="p-8 sm:p-14 lg:p-20">
            <p className="eyebrow">02 — Our Philosophy</p>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight text-foreground">
              “Beautiful spaces should make everyday life easier.”
            </h2>
            <div className="mt-6 space-y-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
              <p>
                A truly luxury kitchen is measured not by how impressive it looks on day one, but by
                how smoothly it operates when making coffee on an early Monday morning, preparing a
                multi-course dinner with friends, or clearing away dinnerware.
              </p>
              <p>
                We study natural sightlines, prep triangles, appliance clearances, and the exact
                balance of open display versus concealed storage. Beauty and function are never
                separate goals; each informs the other.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — WHAT MAKES US DIFFERENT */}
      <section className="section-space bg-background border-b border-border">
        <div className="shell">
          <SectionHeading
            eyebrow="03 — What Makes Us Different"
            title="Design-Led. Craft-Anchored. Fully Accountable."
            copy="Here is why discerning homeowners trust FORMA with their most significant interior transformations."
          />

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {differentiators.map(({ num, title, description }) => (
              <div
                key={num}
                className="border border-border bg-card p-8 flex flex-col justify-between"
              >
                <div>
                  <span className="font-serif text-3xl text-accent font-light block">{num}</span>
                  <h3 className="mt-6 text-base font-semibold uppercase tracking-[0.12em] text-foreground">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04 — OUR APPROACH */}
      <section className="section-space bg-surface border-b border-border">
        <div className="shell">
          <SectionHeading
            eyebrow="04 — Our Approach"
            title="Listen. Plan. Design. Build. Refine."
            copy="Our five-phase methodology ensures that every artistic decision is supported by technical rigor."
          />

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {approachSteps.map(({ step, name, detail }) => (
              <div
                key={step}
                className="border border-border bg-card p-6 flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-mono font-semibold text-accent block">{step}</span>
                  <h3 className="mt-3 font-serif text-2xl font-normal text-foreground">{name}</h3>
                  <p className="mt-3 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                    {detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 05 — CRAFTSMANSHIP */}
      <section className="section-space bg-background border-b border-border">
        <div className="shell grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
          <div>
            <p className="eyebrow">05 — Craftsmanship & Materials</p>
            <h2 className="section-title mt-4">Drawn with purpose. Built with precision.</h2>
            <p className="section-copy mt-4">
              We reject lightweight veneers and mass-produced flat-pack cabinetry. Our workshops
              treat kitchen joinery as permanent architectural furniture.
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {craftsmanshipDisciplines.map((item) => (
                <div key={item.title} className="border-l-2 border-accent pl-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {item.copy}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-hidden border border-border bg-card">
            <img
              src={detailImage}
              alt="Artisan kitchen joinery and bronze hardware craftsmanship"
              width={1200}
              height={900}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 06 — CLIENT EXPERIENCE */}
      <section className="section-space bg-surface border-b border-border">
        <div className="shell max-w-4xl">
          <p className="eyebrow">06 — The Client Experience</p>
          <h2 className="section-title mt-4">Renovation without the friction.</h2>
          <p className="section-copy mt-4">
            Most homeowners dread the disruption of a kitchen remodel. We re-engineered the
            renovation experience to be clean, transparent, and respectful of your home life.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <div className="border border-border bg-card p-6">
              <Shield className="text-accent h-6 w-6" />
              <h3 className="mt-4 text-sm font-semibold uppercase tracking-wider text-foreground">
                Clean Site Protocol
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Negative air scrubbers, zipper plastic walls, and daily end-of-day site vacuuming
                keep living areas dust-free.
              </p>
            </div>

            <div className="border border-border bg-card p-6">
              <MessageSquare className="text-accent h-6 w-6" />
              <h3 className="mt-4 text-sm font-semibold uppercase tracking-wider text-foreground">
                Single Point of Contact
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                You never need to chase subcontractors. Your dedicated Project Lead handles
                scheduling, deliveries, and updates.
              </p>
            </div>

            <div className="border border-border bg-card p-6">
              <CheckCircle className="text-accent h-6 w-6" />
              <h3 className="mt-4 text-sm font-semibold uppercase tracking-wider text-foreground">
                Fixed-Price Scope
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Thorough pre-construction planning ensures clear allowances and fixed contracts
                without sudden billing surprises.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 07 — TEAM */}
      <section className="section-space bg-background border-b border-border">
        <div className="shell">
          <SectionHeading
            eyebrow="07 — Studio Leadership"
            title="The People Behind FORMA."
            copy="Experienced architects, cabinetmakers, and construction managers dedicated to exceptional kitchen transformations."
          />

          <div className="mt-12 grid gap-8 sm:grid-cols-2 max-w-4xl">
            {teamMembers.map((member) => (
              <div key={member.name} className="border border-border bg-card overflow-hidden group">
                <div className="aspect-[3/4] overflow-hidden bg-stone">
                  <img
                    src={member.image}
                    alt={`${member.name}, ${member.role} at FORMA Kitchen Studio`}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-2xl font-normal text-foreground">{member.name}</h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-accent">
                    {member.role}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">{member.credential}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 08 — FINAL CTA */}
      <section className="relative isolate min-h-[500px] overflow-hidden">
        <img
          src={heroImage}
          alt="Luxury kitchen design by FORMA Kitchen Studio"
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="shell relative z-10 flex min-h-[500px] items-center py-20">
          <div className="max-w-2xl text-hero-foreground">
            <p className="eyebrow text-hero-foreground/80">08 — Begin Today</p>
            <h2 className="mt-4 font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-hero-foreground leading-tight">
              Let's Create a Kitchen That Works Beautifully.
            </h2>
            <p className="mt-6 text-base sm:text-lg leading-relaxed text-hero-foreground/85">
              Schedule an exploratory consultation with our senior designers. We'll examine your
              space, answer questions, and outline your renovation possibilities.
            </p>
            <div className="mt-8">
              <Button asChild variant="light" size="default">
                <Link to="/contact">Book a Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
