import { forwardRef, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, children, disabled, ...props }, ref) => {
    
    const variants = {
      primary: "bg-zen-pink text-white shadow-pop hover:scale-[1.02] active:translate-y-1 active:shadow-none",
      secondary: "bg-zen-mint text-text-primary shadow-soft hover:bg-zen-mint-light active:bg-zen-mint-dark",
      danger: "bg-zen-orange text-white shadow-pop hover:scale-[1.02] active:translate-y-1 active:shadow-none",
      ghost: "bg-transparent text-text-secondary hover:bg-black/5 active:bg-black/10 shadow-none",
    };

    const sizes = {
      sm: "h-9 px-4 text-sm rounded-btn",
      md: "h-12 px-6 text-base rounded-btn",
      lg: "h-14 px-8 text-lg font-heading rounded-[1.5rem]",
      icon: "h-12 w-12 flex justify-center items-center rounded-bubble",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex font-game items-center justify-center font-bold transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-zen-pink/30 disabled:opacity-50 disabled:pointer-events-none",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <span className="animate-spin border-2 border-white/40 border-t-white rounded-full w-5 h-5 mr-2" />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
