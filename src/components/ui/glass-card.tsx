import React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassCard({ children, className }: GlassCardProps) {
  return (
    <div className={cn(
      "relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl transition-all hover:border-white/20 hover:bg-white/10 group",
      className
    )}>
      {/* Card Glow Effect */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-white/5 blur-3xl pointer-events-none group-hover:bg-white/10 transition-colors" />
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
