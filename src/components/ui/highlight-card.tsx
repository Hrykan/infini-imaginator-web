"use client";

import { FC, ReactNode } from "react";
import { Card } from "@/components/ui/card";

interface ComponentProps {
  title: string;
  description: string[];
  icon?: ReactNode;
}

const HighlightCard: FC<ComponentProps> = ({ title, description, icon }) => {
  return (
    <div className="group cursor-pointer rounded-2xl overflow-hidden transform transition-all duration-500 hover:scale-[1.03]">
      <Card className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#010101] via-[#090909] to-[#010101] shadow-xl relative overflow-hidden hover:border-[#c0392b]/30 w-full transition-all duration-500">

        {/* Subtle background layer */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.03] to-white/[0.06] opacity-40 group-hover:opacity-70 transition-opacity duration-500" />
          <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-gradient-to-tr from-white/5 to-transparent blur-3xl opacity-20 group-hover:opacity-40 transition-all duration-700" />
          {/* Subtle sweep on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000" />
        </div>

        <div className="p-8 relative z-10 flex flex-col items-center text-center">
          {/* Icon — dark circle, crimson icon color */}
          <div className="relative mb-6">
            <div className="absolute inset-0 rounded-full border border-white/10 animate-pulse" />
            <div className="p-6 rounded-full border border-white/15 bg-gradient-to-br from-[#111111] to-[#080808] shadow-lg transform group-hover:scale-110 transition-all duration-500">
              {icon}
            </div>
          </div>

          {/* Title */}
          <h3 className="mb-4 text-xl font-bold text-[#f5f5f5] group-hover:text-white transform group-hover:scale-105 transition-all duration-300">
            {title}
          </h3>

          {/* Description */}
          <div className="space-y-1 max-w-sm">
            {description.map((line, idx) => (
              <p
                key={idx}
                className="text-[#999999] text-sm leading-relaxed group-hover:text-[#cccccc] transition-colors duration-300"
              >
                {line}
              </p>
            ))}
          </div>

          {/* Crimson accent divider — the main brand touch */}
          <div className="mt-6 w-1/3 h-px bg-gradient-to-r from-transparent via-[#c0392b]/50 to-transparent rounded-full group-hover:w-1/2 group-hover:via-[#c0392b]/80 transition-all duration-500" />

          {/* Brand dots — subtle crimson */}
          <div className="flex space-x-2 mt-4 opacity-30 group-hover:opacity-70 transition-opacity duration-300">
            <div className="w-1.5 h-1.5 bg-[#c0392b] rounded-full" />
            <div className="w-1.5 h-1.5 bg-[#c0392b]/50 rounded-full" />
            <div className="w-1.5 h-1.5 bg-[#c0392b]/25 rounded-full" />
          </div>
        </div>

        {/* Corner accents on hover — subtle white */}
        <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-white/[0.06] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-white/[0.06] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </Card>
    </div>
  );
};

export default HighlightCard;
