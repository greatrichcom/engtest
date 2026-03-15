import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "flex h-12 w-full rounded-btn border-2 bg-white px-4 py-2 font-body text-base font-semibold text-text-primary transition-colors placeholder:text-text-secondary/50 focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:opacity-50",
          error
             ? "border-wrong focus:border-wrong focus:ring-wrong/20"
             : "border-zen-lavender-dark/30 focus:border-zen-purple focus:ring-zen-purple/20",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
