import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Card({
  className,
  children,
  onClick,
}: {
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded-card bg-bg-card p-6 shadow-card transition-all duration-300",
        className
      )}
    >
      {children}
    </div>
  );
}
