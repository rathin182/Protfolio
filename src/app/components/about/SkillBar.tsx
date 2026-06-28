"use client";

import { LucideIcon } from "lucide-react";

type SkillBarProps = {
  title: string;
  value: number;
  icon: LucideIcon;
};

export default function SkillBar({ title, value, icon: Icon }: SkillBarProps) {
  return (
    <div className="space-y-2">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Icon size={15} className="text-white/70" strokeWidth={1.8} />
          <span className="text-[14px] font-medium text-white/85">
            {title}
          </span>
        </div>
        <span className="text-[13px] font-medium text-white/70">
          {value}%
        </span>
      </div>

      {/* Progress Bar */}
      <div
        className="
          relative
          h-[4px]
          overflow-hidden
          rounded-full
          bg-white/10
        "
      >
        {/* Glow */}
        <div
          className="
            absolute
            inset-y-0
            left-0
            rounded-full
            bg-[#3CFF73]
            shadow-[0_0_12px_rgba(60,255,115,0.6)]
            transition-all
            duration-700
          "
          style={{
            width: `${value}%`,
          }}
        />
      </div>
    </div>
  );
}