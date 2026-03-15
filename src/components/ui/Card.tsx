import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Card({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-card bg-bg-card p-6 shadow-card transition-all duration-300",
        className
      )}
    >
      {children}
    </div>
  );
}
