import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap border px-5 text-xs font-semibold uppercase tracking-[0.12em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-primary bg-primary text-primary-foreground hover:bg-primary/88",
        primary: "border-primary bg-primary text-primary-foreground hover:bg-primary/88",
        light: "border-hero-foreground bg-hero-foreground text-primary hover:bg-hero-foreground/90",
        outline: "border-current bg-transparent text-current hover:bg-foreground/10",
        ghost: "border-transparent bg-transparent text-foreground hover:bg-muted",
        icon: "h-11 w-11 border-border bg-background p-0 text-foreground hover:bg-muted",
        secondary: "border-secondary bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-destructive bg-destructive text-destructive-foreground hover:bg-destructive/90",
        link: "border-transparent text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12",
        sm: "h-10 px-4",
        lg: "h-14 px-8",
        icon: "h-11 w-11 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size }), className)} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";
