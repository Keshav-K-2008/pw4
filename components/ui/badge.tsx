import * as React from "react";
import { cn } from "@/lib/utils/cn";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "critical" | "warning" | "success" | "info" | "outline";
}

const variantMap: Record<string, string> = {
  default: "bg-slate-500/15 text-slate-300 border-slate-500/20",
  critical: "bg-red-500/15 text-red-400 border-red-500/20",
  warning: "bg-orange-500/15 text-orange-400 border-orange-500/20",
  success: "bg-green-500/15 text-green-400 border-green-500/20",
  info: "bg-blue-500/15 text-blue-400 border-blue-500/20",
  outline: "border-white/20 text-white",
};

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        variantMap[variant],
        className
      )}
      {...props}
    />
  )
);

Badge.displayName = "Badge";

export { Badge };
