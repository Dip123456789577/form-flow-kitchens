import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, DraftingCompass, Gem, Hammer, KeyRound, Lightbulb, Paintbrush, Ruler, ShieldCheck, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import heroImage from "@/assets/forma-hero.jpg";
import darkKitchen from "@/assets/forma-dark-kitchen.jpg";
import lightKitchen from "@/assets/forma-light-kitchen.jpg";
import detailImage from "@/assets/forma-detail.jpg";
import beforeImage from "@/assets/forma-before.jpg";
import afterImage from "@/assets/forma-after.jpg";
import { Button } from "@/components/ui/button";
import { CTASection, SectionHeading } from "@/components/site";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Kitchen Renovation & Remodeling | FORMA Kitchen Studio" },
    { name: "description", content: "Premium kitchen renovation, remodeling and custom kitchen design. Beautiful spaces designed around how you live." },
    { property: "og:title", content: "Kitchen Renovation & Remodeling | FORMA Kitchen Studio" },
    { property: "og:description", content: "Premium kitchen renovation, remodeling and custom kitchen design. Beautiful spaces designed around how you live." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ], links: [{ rel: "canonical", href: "/" }] }),
  component: HomePage,
});

const services = [
  { title: "Full Kitchen Renovation", text: "One coordinated team for every stage, from careful demolition to the final walkthrough.", image: heroImage, icon: Hammer },
  { title: "Custom Cabinetry", text: "Purpose-built storage with considered proportions, durable finishes and fine joinery.", image: detailImage, icon: Ruler },
  { title: "Kitchen Design", text: "Layouts shaped around movement, natural light and the way your household really works.", image: lightKitchen, icon: DraftingCompass },
  { title: "Countertops & Surfaces", text: "Stone and surface selections chosen for character, performance and a cohesive material story.", image: darkKitchen, icon: Gem },
  { title: "Lighting & Electrical", text: "Layered task and ambient lighting that makes the room practical, warm and easy to use.", image: heroImage, icon: Lightbulb },
  { title: "Flooring & Finishing", text: "The tactile details that bring every surface, fixture and transition together beautifully.", image: lightKitchen, icon: Paintbrush },
];
const projects = [
  { title: "Modern Oak Residence", text: "Warm oak, integrated storage and a generous family island.", image: darkKitchen },
  { title: "Marble & Brass Kitchen", text: "Quiet cabinetry balanced by expressive stone and aged brass.", image: detailImage },
  { title: "Warm Minimal Kitchen", text: "A light-filled room built around calm materials and clear circulation.", image: lightKitchen },
  { title: "Contemporary Family Kitchen", text: "A hardworking everyday kitchen with room to gather.", image: heroImage },
];

function BeforeAfterSlider() {
  const [position, setPosition] = useState(50);
  const update = (value: number) => setPosition(Math.max(2, Math.min(98, value)));
  return <div className="comparison-wrap">
    <div className="comparison" style={{ "--split": `${position}%` } as React.CSSProperties}>
      <img src={afterImage} alt="Oak and stone kitchen after FORMA renovation" width={1408} height={912} loading="lazy" />
      <div className="comparison-before"><img src={beforeImage} alt="Dated kitchen before renovation" width={1408} height={912} loading="lazy" /></div>
      <span className="comparison-label left-4">Before</span><span className="comparison-label right-4">After</span>
      <div className="comparison-line" aria-hidden="true"><span>↔</span></div>
      <input type="range" min="2" max="98" value={position} onChange={(event) => update(Number(event.target.value))} aria-label="Drag to compare before and after kitchen" />
    </div>
    <div className="grid gap-6 border-x border-b border-border bg-background p-6 sm:grid-cols-[1fr_auto] sm:p-8"><div><p className="eyebrow">Oak & Stone Kitchen</p><h3 className="mt-2 font-serif text-3xl">From closed-in to considered.</h3><p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">A complete redesign that opened the room, improved storage and introduced a warmer, more timeless material palette.</p></div><p className="self-end text-xs text-muted-foreground">Drag the divider to compare</p></div>
  </div>;
}

function StatCounter({ value, suffix, label }: { value: number; suffix?: string; label: string }) {
  const [count, setCount] = useState(0); const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { const node = ref.current; if (!node) return; const observer = new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) return; const started = performance.now(); const tick = (now: number) => { const p = Math.min(1, (now - started) / 900); setCount(Math.round(value * p)); if (p < 1) requestAnimationFrame(tick); }; requestAnimationFrame(tick); observer.disconnect(); }, { threshold: .5 }); observer.observe(node); return () => observer.disconnect(); }, [value]);
  return <div ref={ref} className="border-l border-hero-foreground/20 pl-5"><p className="font-serif text-5xl">{count}{suffix}</p><p className="mt-2 text-xs uppercase tracking-[0.12em] text-hero-foreground/60">{label}</p></div>;
}

function HomePage() {
  return <>
    <section className="hero-section">
      <img src={heroImage} alt="Luxury kitchen with warm oak cabinetry and a stone island" width={1920} height={1200} className="absolute inset-0 h-full w-full object-cover" fetchPriority="high" />
      <div className="absolute inset-0 bg-hero-overlay" />
      <div className="shell relative flex min-h-[92svh] items-end pb-20 pt-32 sm:pb-24"><div className="hero-copy max-w-4xl text-hero-foreground"><p className="eyebrow text-hero-foreground/75">Kitchen design · renovation · craftsmanship</p><h1 className="mt-6 max-w-4xl font-serif text-[clamp(3.1rem,8vw,7.4rem)] leading-[.88]">Your Kitchen Should Work Beautifully.</h1><p className="mt-7 max-w-2xl text-base leading-7 text-hero-foreground/85 sm:text-lg">We transform outdated kitchens into thoughtful, beautiful spaces designed around the way you actually live.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><Button asChild variant="light"><Link to="/contact">Book a Free Consultation</Link></Button><Button asChild variant="outline"><a href="#transformations">See Our Transformations</a></Button></div><div className="mt-10 grid max-w-2xl grid-cols-3 gap-3 border-t border-hero-foreground/25 pt-5 text-[10px] uppercase tracking-[0.1em] text-hero-foreground/75 sm:text-xs"><span>Custom Designed</span><span>Quality Craftsmanship</span><span>Fully Managed</span></div></div></div>
    </section>

    <section className="border-b border-border bg-background"><div className="shell py-10"><SectionHeading eyebrow="The FORMA standard" title="Built Around Your Home. Designed Around You." /><div className="mt-10 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">{[[DraftingCompass,"Custom Design"],[Gem,"Premium Materials"],[ShieldCheck,"Expert Craftsmanship"],[KeyRound,"End-to-End Management"]].map(([Icon,label]) => { const C = Icon as typeof DraftingCompass; return <div key={label as string} className="flex items-center gap-4 bg-background p-5"><C size={22} strokeWidth={1.4} className="text-accent"/><span className="text-sm font-medium">{label as string}</span></div>; })}</div></div></section>

    <section className="section-space bg-surface"><div className="shell"><div className="grid gap-8 lg:grid-cols-[1fr_.65fr] lg:items-end"><SectionHeading eyebrow="Complete renovation" title="Everything Your Kitchen Needs. In One Place." /><p className="section-copy">From the first layout to the final handle, we bring design, craftsmanship and project management together under one roof.</p></div><div className="mt-14 grid gap-x-5 gap-y-10 md:grid-cols-2 lg:grid-cols-3">{services.map(({ title, text, image, icon: Icon }, index) => <article key={title} className="service-card"><div className="aspect-[4/3] overflow-hidden"><img src={image} alt={`${title} by FORMA Kitchen Studio`} width={index % 3 === 0 ? 1920 : 1400} height={1000} loading="lazy" /></div><div className="p-6"><div className="flex items-start justify-between gap-4"><Icon size={20} strokeWidth={1.3} className="text-accent"/><span className="text-xs text-muted-foreground">0{index + 1}</span></div><h3 className="mt-8 font-serif text-2xl">{title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p><span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em]">Explore <ArrowRight size={14}/></span></div></article>)}</div></div></section>

    <section id="transformations" className="section-space scroll-mt-20 bg-background"><div className="shell"><SectionHeading eyebrow="Before & after" title="See What Transformation Looks Like." copy="From cramped and dated to open, functional and beautifully finished." /><div className="mt-12"><BeforeAfterSlider /></div></div></section>

    <section className="section-space bg-surface"><div className="shell"><SectionHeading eyebrow="Selected work" title="Kitchens We’ve Transformed." copy="Every project begins with a different home, a different rhythm and a different reason for change." /><div className="portfolio-grid mt-12">{projects.map((project, index) => <article key={project.title} className={`project-card project-${index + 1}`}><img src={project.image} alt={project.title} width={1408} height={1008} loading="lazy" /><div className="project-overlay"><div><h3 className="font-serif text-3xl">{project.title}</h3><p className="mt-2 max-w-sm text-sm text-hero-foreground/75">{project.text}</p></div><ArrowRight className="project-arrow" /></div></article>)}</div></div></section>

    <section className="section-space bg-background"><div className="shell"><SectionHeading eyebrow="Our process" title="From First Idea to Final Reveal." copy="A considered four-step process keeps decisions clear, progress visible and your renovation moving forward." /><div className="mt-14 grid border-y border-border md:grid-cols-4">{[
      ["01","Discover","We start by understanding how you live, what isn’t working and what you want your kitchen to become."],
      ["02","Design","We develop the layout, materials, finishes and details into one cohesive plan."],
      ["03","Build","Our team manages the renovation carefully, keeping quality, communication and timelines at the center."],
      ["04","Reveal","Every detail is finished, checked and refined before we hand your new kitchen back to you."],
    ].map(([num,title,text]) => <article key={num} className="process-step"><p className="font-serif text-4xl text-accent">{num}</p><h3 className="mt-12 text-lg font-semibold">{title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{text}</p></article>)}</div></div></section>

    <section className="bg-primary py-16 text-hero-foreground"><div className="shell grid gap-10 sm:grid-cols-2 lg:grid-cols-4"><StatCounter value={150} suffix="+" label="Kitchens Transformed*"/><StatCounter value={10} suffix="+" label="Years of Experience*"/><StatCounter value={98} suffix="%" label="Client Satisfaction*"/><StatCounter value={1} label="Dedicated Project Team"/></div><p className="shell mt-8 text-[10px] text-hero-foreground/45">*Illustrative business statistics shown as editable placeholders.</p></section>

    <section className="section-space bg-surface"><div className="shell"><SectionHeading eyebrow="Client notes" title="Designed Around Real Lives." /><div className="mt-12 grid gap-px bg-border md:grid-cols-3">{[
      ["Our kitchen feels completely different—not just more beautiful, but so much easier to live in. The team understood what we needed from the beginning.","Lauren & Jay Kim","Full renovation"],
      ["We always knew what was happening next. The workmanship is exceptional, and the small details are what make the room feel so resolved.","Mara Whitfield","Custom cabinetry"],
      ["They found space we didn’t know we had. Morning routines are calmer, entertaining is easier, and the kitchen finally belongs with the rest of our home.","Nina & Sam Brooks","Layout redesign"],
    ].map(([quote,name,type]) => <article key={name} className="bg-surface p-7 sm:p-9"><div className="flex gap-1 text-accent" aria-label="5 out of 5 stars">{Array.from({length:5}).map((_,i)=><Star key={i} size={13} fill="currentColor"/>)}</div><blockquote className="mt-7 font-serif text-2xl leading-9">“{quote}”</blockquote><p className="mt-8 text-sm font-semibold">{name}</p><p className="mt-1 text-xs uppercase tracking-[0.1em] text-muted-foreground">{type}</p></article>)}</div></div></section>
    <CTASection image={darkKitchen} />
  </>;
}