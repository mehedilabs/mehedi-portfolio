import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-slate-800 text-slate-200 hover:bg-slate-700",
        terminal:
          "border-emerald-500/30 bg-emerald-950/40 text-emerald-400 font-mono text-[11px]",
        cyan:
          "border-cyan-500/30 bg-cyan-950/40 text-cyan-400 font-mono text-[11px]",
        amber:
          "border-amber-500/30 bg-amber-950/40 text-amber-400 font-mono text-[11px]",
        outline:
          "border-slate-700/80 bg-slate-900/60 text-slate-300",
        tech:
          "border-slate-800 bg-slate-900/80 text-slate-300 font-mono text-[11px] hover:border-slate-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
