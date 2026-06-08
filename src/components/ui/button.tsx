import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children">;

const variants = {
  primary:
    "bg-white text-ink-950 shadow-glow hover:bg-mint-300 hover:text-ink-950",
  secondary:
    "border border-white/12 bg-white/[0.07] text-white hover:border-mint-300/50 hover:bg-mint-300/10",
  ghost: "text-white/72 hover:bg-white/[0.06] hover:text-white"
};

const sizes = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base"
};

export function Button<T extends ElementType = "button">({
  as,
  children,
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps<T>) {
  const Component = as ?? "button";

  return (
    <Component
      className={cn(
        "focus-ring inline-flex items-center justify-center gap-2 rounded-md font-semibold transition duration-200",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
