import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowRight, Menu, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Chatbot } from "@/components/chatbot";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const overHero = pathname !== "/contact" && !scrolled;

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 40);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className={`site-nav ${overHero ? "site-nav-transparent" : "site-nav-solid"}`}>
      <div className="shell flex h-full items-center justify-between">
        <Link to="/" className="brand-mark" aria-label="FORMA Kitchen Studio home">
          <span>FORMA</span><small>Kitchen Studio</small>
        </Link>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
          {links.map((item) => <Link key={item.to} to={item.to} className="nav-link" activeProps={{ "data-active": true }}>{item.label}</Link>)}
        </nav>
        <div className="hidden md:block"><Button asChild variant={overHero ? "light" : "primary"} size="sm"><Link to="/contact">Book a Consultation</Link></Button></div>
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen((value) => !value)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
          {open ? <X /> : <Menu />}
        </Button>
      </div>
      <div className={`mobile-menu md:hidden ${open ? "mobile-menu-open" : ""}`}>
        <nav className="shell flex flex-col gap-1 py-5" aria-label="Mobile navigation">
          {links.map((item) => <Link key={item.to} to={item.to} className="mobile-nav-link">{item.label}<ArrowRight size={16} /></Link>)}
          <Button asChild className="mt-3"><Link to="/contact">Book a Consultation</Link></Button>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="shell grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div><div className="brand-mark text-foreground"><span>FORMA</span><small>Kitchen Studio</small></div><p className="mt-5 max-w-sm text-sm leading-7 text-muted-foreground">Designed for living. Built to last. Thoughtful kitchens, carefully managed from first sketch to final detail.</p></div>
        <div><p className="eyebrow">Explore</p><div className="mt-4 flex flex-col gap-3 text-sm">{links.map((item) => <Link key={item.to} to={item.to} className="w-fit hover:text-accent">{item.label}</Link>)}</div></div>
        <div><p className="eyebrow">Studio</p><div className="mt-4 space-y-2 text-sm text-muted-foreground"><p>(555) 014-0278</p><p>hello@formakitchens.example</p><p>Mon–Fri, 8:30am–5:30pm</p></div></div>
      </div>
      <div className="shell flex flex-col gap-2 border-t border-border py-5 text-xs text-muted-foreground sm:flex-row sm:justify-between"><p>© 2026 FORMA Kitchen Studio</p><p>Placeholder business information</p></div>
    </footer>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return <><Navbar /><main>{children}</main><Footer /><Chatbot /></>;
}

export function SectionHeading({ eyebrow, title, copy, centered = false }: { eyebrow: string; title: string; copy?: string; centered?: boolean }) {
  return <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}><p className="eyebrow">{eyebrow}</p><h2 className="section-title mt-4">{title}</h2>{copy && <p className="section-copy mt-5">{copy}</p>}</div>;
}

export function CTASection({ image, title = "Ready to Love Your Kitchen Again?" }: { image: string; title?: string }) {
  return <section className="relative isolate min-h-[560px] overflow-hidden"><img src={image} alt="Beautifully renovated FORMA kitchen" className="absolute inset-0 h-full w-full object-cover" loading="lazy" /><div className="absolute inset-0 bg-hero-overlay" /><div className="shell relative flex min-h-[560px] items-center py-20"><div className="max-w-2xl text-hero-foreground"><p className="eyebrow text-hero-foreground/70">Your project begins here</p><h2 className="mt-5 font-serif text-5xl leading-[1.02] sm:text-6xl">{title}</h2><p className="mt-6 max-w-xl text-base leading-7 text-hero-foreground/80">Tell us what isn’t working, what you’re imagining, or simply where you’d like to begin. We’ll take it from there.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><Button asChild variant="light"><Link to="/contact">Book Your Free Consultation</Link></Button><Button asChild variant="outline"><Link to="/contact">Contact Our Team</Link></Button></div></div></div></section>;
}