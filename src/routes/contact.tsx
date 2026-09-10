import { createFileRoute } from "@tanstack/react-router";
import {
  Calendar,
  CheckCircle2,
  Clock3,
  DollarSign,
  HelpCircle,
  Mail,
  MapPin,
  Phone,
  Send,
  Sparkles,
} from "lucide-react";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact FORMA Kitchen Studio | Book a Free Consultation" },
      {
        name: "description",
        content:
          "Have a kitchen renovation in mind? Request a free consultation with FORMA Kitchen Studio to explore design layouts, custom cabinetry, and project timelines.",
      },
      { property: "og:title", content: "Contact FORMA Kitchen Studio" },
      {
        property: "og:description",
        content: "Tell us about your kitchen space and request a personalized design consultation.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const contactSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name (minimum 2 characters).")
    .max(100),
  email: z.string().trim().email("Please provide a valid email address.").max(255),
  phone: z.string().trim().min(7, "Please enter a valid phone number.").max(30),
  projectType: z.string().min(1, "Please select a project type."),
  budget: z.string().min(1, "Please select an estimated budget range."),
  startDate: z.string().min(1, "Please select an anticipated start date."),
  details: z
    .string()
    .trim()
    .min(15, "Please describe your project (minimum 15 characters).")
    .max(2000),
});

type FormErrors = Partial<Record<keyof z.infer<typeof contactSchema>, string>>;

function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const raw = Object.fromEntries(formData);

    const validation = contactSchema.safeParse(raw);

    if (!validation.success) {
      const fieldErrors: FormErrors = {};
      validation.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof FormErrors;
        if (!fieldErrors[key]) {
          fieldErrors[key] = issue.message;
        }
      });
      setErrors(fieldErrors);
      setStatus("error");
      return;
    }

    setErrors({});
    setStatus("loading");

    // Realistic API network simulation
    await new Promise((resolve) => window.setTimeout(resolve, 900));
    setStatus("success");
    form.reset();
  };

  return (
    <div className="bg-background">
      {/* HERO SECTION */}
      <section className="bg-surface pt-32 pb-16 sm:pt-40 sm:pb-20 border-b border-border">
        <div className="shell text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 border border-border bg-background px-3.5 py-1.5 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent">
              COMMENCE YOUR PROJECT
            </p>
          </div>
          <h1 className="font-serif text-[clamp(2.6rem,6vw,5.5rem)] font-normal leading-[1] text-foreground">
            Let's Talk About Your Kitchen.
          </h1>
          <p className="mt-6 text-base sm:text-lg leading-relaxed text-muted-foreground">
            Have a renovation in mind? Tell us a little about your space and what you're hoping to
            change.
          </p>
        </div>
      </section>

      {/* FORM & DETAILS SECTION */}
      <section className="shell py-16 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:gap-16 items-start">
          {/* Main Contact Form */}
          <div className="border border-border bg-card p-8 sm:p-12 shadow-xs">
            <div className="border-b border-border pb-6 mb-8">
              <p className="eyebrow">Consultation Request</p>
              <h2 className="mt-2 font-serif text-3xl font-normal text-foreground">
                Tell Us About Your Space
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Complete the fields below to schedule a private on-site consultation with our senior
                design team.
              </p>
            </div>

            {status === "success" ? (
              <div
                className="border border-accent/60 bg-surface p-8 sm:p-10 text-center animate-fade-in"
                role="status"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent text-primary-foreground mb-6">
                  <CheckCircle2 size={28} />
                </div>
                <h3 className="font-serif text-3xl font-normal text-foreground">Thank you.</h3>
                <p className="mt-4 text-sm sm:text-base leading-relaxed text-muted-foreground max-w-md mx-auto">
                  We've received your project details. Our team will review your requirements and
                  reach out within 24 business hours to arrange your consultation.
                </p>
                <div className="mt-8">
                  <Button onClick={() => setStatus("idle")} variant="primary">
                    Submit Another Request
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  {/* Full Name */}
                  <label className="form-field">
                    <span>Full Name *</span>
                    <input
                      name="fullName"
                      type="text"
                      placeholder="e.g. Eleanor Vance"
                      aria-invalid={Boolean(errors.fullName)}
                      aria-describedby={errors.fullName ? "fullName-error" : undefined}
                      className={errors.fullName ? "border-destructive!" : ""}
                      required
                    />
                    {errors.fullName && (
                      <small id="fullName-error" className="text-destructive">
                        {errors.fullName}
                      </small>
                    )}
                  </label>

                  {/* Email */}
                  <label className="form-field">
                    <span>Email Address *</span>
                    <input
                      name="email"
                      type="email"
                      placeholder="eleanor@example.com"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      className={errors.email ? "border-destructive!" : ""}
                      required
                    />
                    {errors.email && (
                      <small id="email-error" className="text-destructive">
                        {errors.email}
                      </small>
                    )}
                  </label>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  {/* Phone */}
                  <label className="form-field">
                    <span>Phone Number *</span>
                    <input
                      name="phone"
                      type="tel"
                      placeholder="(555) 014-0278"
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? "phone-error" : undefined}
                      className={errors.phone ? "border-destructive!" : ""}
                      required
                    />
                    {errors.phone && (
                      <small id="phone-error" className="text-destructive">
                        {errors.phone}
                      </small>
                    )}
                  </label>

                  {/* Preferred Start Date */}
                  <label className="form-field">
                    <span>Preferred Start Date *</span>
                    <input
                      name="startDate"
                      type="date"
                      aria-invalid={Boolean(errors.startDate)}
                      aria-describedby={errors.startDate ? "startDate-error" : undefined}
                      className={errors.startDate ? "border-destructive!" : ""}
                      required
                    />
                    {errors.startDate && (
                      <small id="startDate-error" className="text-destructive">
                        {errors.startDate}
                      </small>
                    )}
                  </label>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  {/* Project Type Dropdown */}
                  <label className="form-field">
                    <span>Project Type *</span>
                    <select
                      name="projectType"
                      defaultValue=""
                      aria-invalid={Boolean(errors.projectType)}
                      aria-describedby={errors.projectType ? "projectType-error" : undefined}
                      className={errors.projectType ? "border-destructive!" : ""}
                      required
                    >
                      <option value="" disabled>
                        Select a project type
                      </option>
                      <option value="Full Kitchen Renovation">Full Kitchen Renovation</option>
                      <option value="Kitchen Design">Kitchen Design</option>
                      <option value="Custom Cabinetry">Custom Cabinetry</option>
                      <option value="Countertops">Countertops</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.projectType && (
                      <small id="projectType-error" className="text-destructive">
                        {errors.projectType}
                      </small>
                    )}
                  </label>

                  {/* Budget Dropdown */}
                  <label className="form-field">
                    <span>Estimated Budget *</span>
                    <select
                      name="budget"
                      defaultValue=""
                      aria-invalid={Boolean(errors.budget)}
                      aria-describedby={errors.budget ? "budget-error" : undefined}
                      className={errors.budget ? "border-destructive!" : ""}
                      required
                    >
                      <option value="" disabled>
                        Select estimated budget
                      </option>
                      <option value="Under $15,000">Under $15,000</option>
                      <option value="$15,000–$30,000">$15,000–$30,000</option>
                      <option value="$30,000–$50,000">$30,000–$50,000</option>
                      <option value="$50,000+">$50,000+</option>
                      <option value="Not Sure Yet">Not Sure Yet</option>
                    </select>
                    {errors.budget && (
                      <small id="budget-error" className="text-destructive">
                        {errors.budget}
                      </small>
                    )}
                  </label>
                </div>

                {/* Tell Us About Your Project */}
                <label className="form-field">
                  <span>Tell Us About Your Project *</span>
                  <textarea
                    name="details"
                    rows={5}
                    maxLength={2000}
                    placeholder="Tell us about your current kitchen layout, architectural style, what isn't functioning, and what materials you envision..."
                    aria-invalid={Boolean(errors.details)}
                    aria-describedby={errors.details ? "details-error" : undefined}
                    className={errors.details ? "border-destructive!" : ""}
                    required
                  />
                  {errors.details && (
                    <small id="details-error" className="text-destructive">
                      {errors.details}
                    </small>
                  )}
                </label>

                {status === "error" && (
                  <p className="text-sm font-medium text-destructive" role="alert">
                    Please review and resolve the highlighted fields before submitting.
                  </p>
                )}

                <div className="pt-2">
                  <Button
                    type="submit"
                    size="default"
                    disabled={status === "loading"}
                    className="w-full sm:w-auto min-w-[240px]"
                  >
                    {status === "loading" ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
                        Submitting...
                      </span>
                    ) : (
                      "Request a Free Consultation"
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* Contact Details Sidebar & Service Area Map */}
          <aside className="space-y-8">
            <div className="border border-border bg-card p-8 sm:p-10">
              <p className="eyebrow">Studio Information</p>
              <h3 className="mt-2 font-serif text-2xl font-normal text-foreground">Get In Touch</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                We invite homeowners to explore our material samples, joinery mockups, and stone
                library.
              </p>

              <div className="mt-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 border border-border bg-surface text-accent shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground block">
                      Direct Telephone
                    </span>
                    <a
                      href="tel:5550140278"
                      className="text-sm font-medium text-foreground hover:text-accent transition-colors"
                    >
                      (555) 014-0278
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2.5 border border-border bg-surface text-accent shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground block">
                      Email Inquiries
                    </span>
                    <a
                      href="mailto:hello@formakitchens.example"
                      className="text-sm font-medium text-foreground hover:text-accent transition-colors"
                    >
                      hello@formakitchens.example
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2.5 border border-border bg-surface text-accent shrink-0">
                    <Clock3 size={18} />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground block">
                      Studio Hours
                    </span>
                    <p className="text-sm text-foreground">Monday – Friday: 8:30 AM – 5:30 PM</p>
                    <p className="text-xs text-muted-foreground">
                      Saturday: By Appointment · Sunday: Closed
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2.5 border border-border bg-surface text-accent shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground block">
                      Primary Service Area
                    </span>
                    <p className="text-sm text-foreground">
                      Greater Metropolitan Design District & Surrounding Communities
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Aesthetic Architectural Service Map Section */}
            <div className="border border-border bg-card p-6 overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Location & Coverage
                  </p>
                  <p className="font-serif text-lg text-foreground">Studio & On-Site Service</p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs text-accent font-medium">
                  <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                  Active Region
                </span>
              </div>

              {/* Visual Map Representation */}
              <div className="relative aspect-[16/10] w-full border border-border bg-[#F5F2EC] dark:bg-[#1E1B18] overflow-hidden flex items-center justify-center p-4">
                <svg
                  className="w-full h-full opacity-35"
                  viewBox="0 0 400 240"
                  fill="none"
                  stroke="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path
                        d="M 20 0 L 0 0 0 20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="0.5"
                      />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                  {/* Stylized road arteries */}
                  <path d="M 0 120 Q 200 90 400 130" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M 180 0 Q 210 120 220 240" stroke="currentColor" strokeWidth="1.5" />
                  <path
                    d="M 50 40 Q 200 180 360 200"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />
                  {/* Coverage radius circles */}
                  <circle
                    cx="200"
                    cy="115"
                    r="75"
                    stroke="var(--accent)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    fill="var(--accent)"
                    fillOpacity="0.06"
                  />
                  <circle
                    cx="200"
                    cy="115"
                    r="40"
                    stroke="var(--accent)"
                    strokeWidth="1.5"
                    fill="var(--accent)"
                    fillOpacity="0.12"
                  />
                </svg>

                <div className="absolute flex flex-col items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg border-2 border-accent">
                    <MapPin size={20} className="text-accent" />
                  </div>
                  <div className="mt-2 rounded-xs bg-background/95 backdrop-blur-xs px-3 py-1 text-center border border-border shadow-xs">
                    <p className="text-xs font-semibold text-foreground">FORMA Studio Hub</p>
                    <p className="text-[10px] text-muted-foreground">30-Mile Renovation Radius</p>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-[11px] text-muted-foreground leading-relaxed text-center">
                We provide complimentary on-site architectural reviews across the greater metro
                region.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
