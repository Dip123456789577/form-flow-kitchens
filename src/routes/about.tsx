import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/forma-light-kitchen.jpg";
import darkKitchen from "@/assets/forma-dark-kitchen.jpg";
import detailImage from "@/assets/forma-detail.jpg";
import { Button } from "@/components/ui/button";
import { CTASection, SectionHeading } from "@/components/site";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [
    { title: "About FORMA Kitchen Studio | Thoughtful Kitchen Design" },
    { name: "description", content: "Meet the design-led team behind FORMA Kitchen Studio and discover our thoughtful, fully managed approach to kitchen renovation." },
    { property: "og:title", content: "About FORMA Kitchen Studio" },
    { property: "og:description", content: "Thoughtful design, skilled craftsmanship and one carefully managed renovation process." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ], links: [{ rel: "canonical", href: "/about" }] }), component: AboutPage,
});

function AboutPage() {
  return <>
    <section className="page-hero"><img src={heroImage} alt="Light-filled custom kitchen by FORMA" width={1408} height={1008} className="absolute inset-0 h-full w-full object-cover" fetchPriority="high"/><div className="absolute inset-0 bg-hero-overlay"/><div className="shell relative flex min-h-[76svh] items-end pb-16 pt-32 text-hero-foreground"><div className="max-w-4xl"><p className="eyebrow text-hero-foreground/70">About FORMA</p><h1 className="mt-5 font-serif text-[clamp(3.2rem,8vw,7rem)] leading-[.92]">Good Design Starts With Listening.</h1><p className="mt-7 max-w-2xl text-lg leading-8 text-hero-foreground/80">We believe the best kitchens aren’t designed for photographs. They’re designed for real life.</p></div></div></section>

    <section className="section-space bg-background"><div className="shell grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-24"><div><p className="eyebrow">Our story</p><h2 className="section-title mt-5">A studio built around better decisions.</h2></div><div className="space-y-6 text-base leading-8 text-muted-foreground"><p>FORMA began with a simple observation: a kitchen renovation can be beautifully designed and still feel unnecessarily difficult. Too many clients were left coordinating trades, questioning timelines and making disconnected choices.</p><p>We created a different kind of studio—one that listens first, brings design and construction into the same conversation, and stays accountable for the complete result.</p><blockquote className="border-l-2 border-accent pl-6 font-serif text-3xl leading-tight text-foreground">“We listen before we design.”</blockquote></div></div></section>

    <section className="bg-surface"><div className="shell grid lg:grid-cols-2"><img src={darkKitchen} alt="Handcrafted dark walnut FORMA kitchen" width={1408} height={1008} loading="lazy" className="h-full min-h-[520px] w-full object-cover"/><div className="flex items-center p-8 sm:p-14 lg:p-20"><div><p className="eyebrow">Our philosophy</p><h2 className="mt-5 font-serif text-5xl leading-tight">Form follows the way you live.</h2><div className="mt-8 space-y-5 text-sm leading-7 text-muted-foreground"><p>Every kitchen should reflect the people who use it. We pay attention to the route between the refrigerator and sink, where morning light falls, what needs to stay within reach and what deserves to be hidden.</p><p>Beautiful materials matter. So does how the space functions on an ordinary Tuesday evening. Our work brings those two truths together.</p></div></div></div></div></section>

    <section className="section-space bg-background"><div className="shell"><SectionHeading eyebrow="What makes us different" title="One Team. One Standard. Every Detail." /><div className="mt-14 grid gap-px bg-border md:grid-cols-3">{[
      ["01","Thoughtful by default","We solve the everyday friction before selecting finishes, so beauty rests on a practical foundation."],
      ["02","Clear from the outset","Detailed scopes, transparent allowances and regular updates help clients make decisions with confidence."],
      ["03","Responsible throughout","We manage the entire process so our clients don’t have to coordinate a room full of specialists."],
    ].map(([n,t,d]) => <article key={n} className="bg-background p-8 sm:p-10"><p className="font-serif text-4xl text-accent">{n}</p><h3 className="mt-14 text-lg font-semibold">{t}</h3><p className="mt-4 text-sm leading-7 text-muted-foreground">{d}</p></article>)}</div></div></section>

    <section className="section-space bg-surface"><div className="shell grid items-center gap-12 lg:grid-cols-2 lg:gap-20"><div><p className="eyebrow">Design & craftsmanship</p><h2 className="section-title mt-5">Drawn with purpose. Built with precision.</h2><p className="section-copy mt-6">Our designers and craftspeople work from the same plan. That continuity protects the original idea while allowing small refinements to happen where they matter most—on site, in the joinery and at every junction.</p><ul className="mt-9 space-y-4 text-sm">{["Layouts tested against everyday movement","Materials selected for beauty and durability","Cabinetry detailed to the millimeter","A single team from concept to completion"].map((item) => <li key={item} className="flex items-center gap-3 border-b border-border pb-4"><ArrowRight size={15} className="text-accent"/>{item}</li>)}</ul></div><img src={detailImage} alt="Oak cabinetry and bronze hardware craftsmanship detail" width={1200} height={912} loading="lazy" className="aspect-[4/5] w-full object-cover"/></div></section>

    <section className="section-space bg-background"><div className="shell"><SectionHeading eyebrow="How we work with clients" title="A Calm, Well-Made Process." copy="You’ll always know what has been decided, what comes next and who is responsible for it." /><div className="mt-12 grid gap-6 md:grid-cols-3"><article className="border-t border-accent pt-6"><h3 className="font-serif text-3xl">Listen closely</h3><p className="mt-4 text-sm leading-7 text-muted-foreground">We start with your routines, frustrations and hopes—not a predetermined style.</p></article><article className="border-t border-accent pt-6"><h3 className="font-serif text-3xl">Make it clear</h3><p className="mt-4 text-sm leading-7 text-muted-foreground">Options are edited, drawings are understandable and decisions arrive in the right order.</p></article><article className="border-t border-accent pt-6"><h3 className="font-serif text-3xl">Stay accountable</h3><p className="mt-4 text-sm leading-7 text-muted-foreground">One project lead keeps communication direct from the first meeting to the final handover.</p></article></div></div></section>

    <section className="section-space bg-primary text-hero-foreground"><div className="shell grid items-end gap-10 lg:grid-cols-[1fr_.7fr]"><div><p className="eyebrow text-hero-foreground/60">Our team</p><h2 className="mt-5 max-w-3xl font-serif text-5xl leading-tight sm:text-6xl">Designers, makers and project leaders who care about the whole room.</h2></div><div><p className="text-sm leading-7 text-hero-foreground/70">FORMA is presented as an original studio concept. Team names, credentials and portraits can be added when real business information is available.</p><Button asChild variant="light" className="mt-8"><Link to="/contact">Talk to Our Team</Link></Button></div></div></section>
    <CTASection image={heroImage} title="Let’s Make the Room Work for You." />
  </>;
}