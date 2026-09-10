import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap border px-5 text-xs font-semibold uppercase tracking-[0.12em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "border-primary bg-primary text-primary-foreground hover:bg-primary/88",
        light: "border-hero-foreground bg-hero-foreground text-primary hover:bg-hero-foreground/90",
        outline: "border-current bg-transparent text-current hover:bg-foreground/10",
        ghost: "border-transparent bg-transparent text-foreground hover:bg-muted",
        icon: "h-11 w-11 border-border bg-background p-0 text-foreground hover:bg-muted",
      },
      size: { default: "h-12", sm: "h-10 px-4", icon: "h-11 w-11 p-0" },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants> & { asChild?: boolean };

export function Button({ className, variant, size, asChild, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}