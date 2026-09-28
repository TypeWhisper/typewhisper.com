import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Pills throughout; the focus ring comes from the global `:focus-visible` rule.
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-[color,background-color,border-color,transform] duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary font-semibold text-primary-foreground hover:bg-primary-hover",
        destructive: "bg-destructive text-white hover:bg-destructive/90",
        outline:
          "border border-hairline-strong bg-transparent text-foreground hover:border-link",
        secondary:
          "border border-hairline bg-secondary text-secondary-foreground hover:border-hairline-strong",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-link underline-offset-4 hover:underline",
        "link-arrow": "text-link hover:text-link-hover p-0 h-auto font-medium",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 px-6 has-[>svg]:px-4",
        xl: "h-12 px-8 text-base has-[>svg]:px-6",
        icon: "size-9",
        "icon-sm": "size-8",
        pill: "h-12 px-8 text-base has-[>svg]:px-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
