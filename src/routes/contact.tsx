import { createFileRoute } from "@tanstack/react-router";
import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [
    { title: "Contact FORMA | Book a Kitchen Consultation" },
    { name: "description", content: "Tell FORMA Kitchen Studio about your renovation and request a free kitchen design consultation." },
    { property: "og:title", content: "Book a Kitchen Consultation | FORMA" },
    { property: "og:description", content: "Share your kitchen renovation plans with our design and project team." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ], links: [{ rel: "canonical", href: "/contact" }] }), component: ContactPage,
});

const schema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name.").max(100),
  email: z.string().trim().email("Please enter a valid email address.").max(255),
  phone: z.string().trim().min(7, "Please enter a valid phone number.").max(30),
  projectType: z.string().min(1, "Please choose a project type."), budget: z.string().min(1, "Please choose a budget."),
  startDate: z.string().min(1, "Please select a preferred start date."), details: z.string().trim().min(20, "Please tell us a little more about your project.").max(1500),
});
type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;

function ContactPage() {
  const [status, setStatus] = useState<"idle"|"loading"|"success"|"error">("idle"); const [errors, setErrors] = useState<Errors>({});
  const submit = async (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); const form = event.currentTarget; const data = Object.fromEntries(new FormData(form)); const result = schema.safeParse(data); if (!result.success) { const next: Errors = {}; result.error.issues.forEach((issue) => { const key = issue.path[0] as keyof Errors; if (!next[key]) next[key] = issue.message; }); setErrors(next); setStatus("error"); return; } setErrors({}); setStatus("loading"); await new Promise((resolve) => window.setTimeout(resolve, 800)); setStatus("success"); form.reset(); };
  const field = (name: keyof Errors, label: string, type = "text") => <label className="form-field"><span>{label} *</span><input name={name} type={type} aria-invalid={Boolean(errors[name])} aria-describedby={`${name}-error`} />{errors[name] && <small id={`${name}-error`}>{errors[name]}</small>}</label>;
  return <section className="bg-surface pt-28 sm:pt-36"><div className="shell pb-16 text-center"><p className="eyebrow">Begin a conversation</p><h1 className="mx-auto mt-5 max-w-4xl font-serif text-[clamp(3.3rem,8vw,7rem)] leading-[.95]">Let’s Build Your Kitchen.</h1><p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-muted-foreground">Have a renovation in mind? Tell us a little about your space and what you’re hoping to change.</p></div>
    <div className="border-y border-border bg-background"><div className="shell grid lg:grid-cols-[1fr_.55fr]">
      <div className="py-14 lg:pr-16"><p className="eyebrow">Design consultation request</p><h2 className="mt-4 font-serif text-4xl">Tell us about your project.</h2>{status === "success" ? <div className="mt-10 border border-accent bg-surface p-8" role="status"><h3 className="font-serif text-3xl">Thank you.</h3><p className="mt-4 leading-7 text-muted-foreground">We’ve received your project details and will be in touch soon.</p><Button className="mt-7" onClick={() => setStatus("idle")}>Send Another Enquiry</Button></div> : <form className="mt-9 grid gap-5 sm:grid-cols-2" onSubmit={submit} noValidate>
        {field("fullName","Full Name")}{field("email","Email Address","email")}{field("phone","Phone Number","tel")}
        <label className="form-field"><span>Project Type *</span><select name="projectType" defaultValue=""><option value="" disabled>Select project type</option>{["Full Kitchen Renovation","Kitchen Design","Custom Cabinetry","Countertops","Other"].map((x)=><option key={x}>{x}</option>)}</select>{errors.projectType && <small>{errors.projectType}</small>}</label>
        <label className="form-field"><span>Estimated Budget *</span><select name="budget" defaultValue=""><option value="" disabled>Select estimated budget</option>{["Under $15,000","$15,000–$30,000","$30,000–$50,000","$50,000+","Not Sure Yet"].map((x)=><option key={x}>{x}</option>)}</select>{errors.budget && <small>{errors.budget}</small>}</label>
        {field("startDate","Preferred Start Date","date")}
        <label className="form-field sm:col-span-2"><span>Tell Us About Your Project *</span><textarea name="details" rows={6} maxLength={1500} placeholder="What would you like to change?" />{errors.details && <small>{errors.details}</small>}</label>
        {status === "error" && <p className="sm:col-span-2 text-sm text-destructive" role="alert">Please review the highlighted fields.</p>}<Button className="sm:col-span-2 sm:w-fit" disabled={status === "loading"}>{status === "loading" ? "Sending…" : "Request a Free Consultation"}</Button>
      </form>}</div>
      <aside className="border-t border-border py-14 lg:border-l lg:border-t-0 lg:pl-16"><p className="eyebrow">Contact the studio</p><div className="mt-8 space-y-7">{[[Phone,"Phone","(555) 014-0278"],[Mail,"Email","hello@formakitchens.example"],[Clock3,"Business Hours","Monday–Friday, 8:30am–5:30pm"],[MapPin,"Service Area","Greater Metro Area & surrounding communities"]].map(([Icon,label,value]) => { const C = Icon as typeof Phone; return <div key={label as string} className="grid grid-cols-[auto_1fr] gap-4"><C size={19} className="mt-1 text-accent"/><div><p className="text-xs font-semibold uppercase tracking-[0.1em]">{label as string}</p><p className="mt-2 text-sm leading-6 text-muted-foreground">{value as string}</p></div></div>; })}</div><div className="map-placeholder mt-10"><MapPin size={28}/><span>FORMA service area</span><small>Location shown for placement only</small></div><p className="mt-5 text-xs leading-5 text-muted-foreground">Contact details and location are realistic placeholders and should be replaced with verified business information before publishing.</p></aside>
    </div></div></section>;
}