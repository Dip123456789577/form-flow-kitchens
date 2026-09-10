import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowRight, Instagram, Menu, X, Facebook, Globe, Phone, Mail, MapPin } from "lucide-react";
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
  const isContactPage = pathname === "/contact";
  const overHero = !isContactPage && !scrolled;

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 30);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className={`site-nav ${overHero ? "site-nav-transparent" : "site-nav-solid"}`}>
      <div className="shell flex h-full items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="brand-mark" aria-label="FORMA Kitchen Studio Home">
          <span>FORMA</span>
          <small>Kitchen Studio</small>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-10 md:flex" aria-label="Primary navigation">
          {links.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="nav-link"
              activeProps={{ "data-active": true }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Button
            asChild
            variant={overHero ? "light" : "primary"}
            size="sm"
            className="transition-all duration-300"
          >
            <Link to="/contact">Book Consultation</Link>
          </Button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          className="md:hidden p-2 text-inherit transition-opacity hover:opacity-75 focus:outline-none"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-menu md:hidden ${open ? "mobile-menu-open" : ""}`}>
        <nav className="shell flex flex-col gap-2 py-6" aria-label="Mobile navigation">
          {links.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="mobile-nav-link"
              activeProps={{ className: "mobile-nav-link text-accent font-semibold" }}
            >
              <span>{item.label}</span>
              <ArrowRight size={16} className="opacity-60" />
            </Link>
          ))}
          <div className="pt-4">
            <Button asChild className="w-full">
              <Link to="/contact">Book a Consultation</Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-background text-foreground">
      <div className="shell grid gap-12 py-16 sm:py-20 md:grid-cols-2 lg:grid-cols-4">
        {/* Col 1: Brand & Tagline */}
        <div className="space-y-4 lg:col-span-1">
          <Link to="/" className="brand-mark text-foreground">
            <span>FORMA</span>
            <small>Kitchen Studio</small>
          </Link>
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground pt-2">
            Designed for living. Built to last. Premium architectural kitchen renovation, bespoke
            cabinetry, and end-to-end design management.
          </p>
          <div className="flex items-center gap-3 pt-2 text-muted-foreground">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="FORMA on Instagram"
              className="p-2 border border-border rounded-xs hover:border-accent hover:text-accent transition-colors"
            >
              <Instagram size={15} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="FORMA on Facebook"
              className="p-2 border border-border rounded-xs hover:border-accent hover:text-accent transition-colors"
            >
              <Facebook size={15} />
            </a>
            <a
              href="#"
              aria-label="FORMA Studio Portfolio"
              className="p-2 border border-border rounded-xs hover:border-accent hover:text-accent transition-colors"
            >
              <Globe size={15} />
            </a>
          </div>
        </div>

        {/* Col 2: Navigation */}
        <div>
          <p className="eyebrow">Studio</p>
          <ul className="mt-5 space-y-2.5 text-sm">
            <li>
              <Link
                to="/"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Our Philosophy
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Craftsmanship & Team
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Services */}
        <div>
          <p className="eyebrow">Services</p>
          <ul className="mt-5 space-y-2.5 text-sm text-muted-foreground">
            <li className="hover:text-foreground transition-colors">Complete Kitchen Renovation</li>
            <li className="hover:text-foreground transition-colors">Custom Cabinetry & Millwork</li>
            <li className="hover:text-foreground transition-colors">
              Kitchen Architectural Design
            </li>
            <li className="hover:text-foreground transition-colors">
              Countertops & Solid Surfaces
            </li>
            <li className="hover:text-foreground transition-colors">
              Lighting & Electrical Layout
            </li>
            <li className="hover:text-foreground transition-colors">
              Flooring & Finishing Details
            </li>
          </ul>
        </div>

        {/* Col 4: Contact info */}
        <div>
          <p className="eyebrow">Direct Contact</p>
          <div className="mt-5 space-y-3 text-sm text-muted-foreground">
            <p className="flex items-center gap-2.5">
              <Phone size={14} className="text-accent" />
              <span>(555) 014-0278</span>
            </p>
            <p className="flex items-center gap-2.5">
              <Mail size={14} className="text-accent" />
              <span>hello@formakitchens.example</span>
            </p>
            <p className="flex items-start gap-2.5">
              <MapPin size={14} className="text-accent mt-0.5" />
              <span>Metropolitan Design District & Surrounding Communities</span>
            </p>
            <p className="text-xs pt-1 text-muted-foreground/80">
              Monday – Friday: 8:30 AM – 5:30 PM
              <br />
              Saturday: By Private Appointment
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="shell flex flex-col gap-3 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 FORMA Kitchen Studio. All rights reserved. Designed for living. Built to last.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <Chatbot />
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  copy,
  centered = false,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  centered?: boolean;
}) {
  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="section-title mt-3 sm:mt-4">{title}</h2>
      {copy && <p className="section-copy mt-4 sm:mt-5">{copy}</p>}
    </div>
  );
}

export function CTASection({
  image,
  title = "Ready to Love Your Kitchen Again?",
  subtitle = "Tell us what isn’t working, what you’re imagining, or simply where you’d like to begin. We’ll take it from there.",
}: {
  image: string;
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="relative isolate min-h-[560px] overflow-hidden">
      <img
        src={image}
        alt="Architectural luxury kitchen by FORMA Kitchen Studio"
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-hero-overlay" />
      <div className="shell relative flex min-h-[560px] items-center py-20 sm:py-28">
        <div className="max-w-2xl text-hero-foreground">
          <p className="eyebrow text-hero-foreground/80">Begin Your Transformation</p>
          <h2 className="mt-4 font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.04] text-hero-foreground">
            {title}
          </h2>
          <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-hero-foreground/85">
            {subtitle}
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Button asChild variant="light" size="default">
              <Link to="/contact">Book Your Free Consultation</Link>
            </Button>
            <Button asChild variant="outline" size="default">
              <Link to="/contact">Contact Our Team</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
