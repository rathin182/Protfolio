"use client";

import { ArrowRight } from "lucide-react";

type GlowButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

export default function GlowButton({ children, onClick }: GlowButtonProps) {
  return (
    <button
      onClick={onClick}
      className="
        group
        relative
        inline-flex
        items-center
        justify-center
        gap-2.5
        overflow-hidden
        rounded-lg
        bg-[#3CFF73]
        px-7
        py-3.5
        text-[14px]
        font-semibold
        text-[#04100a]
        shadow-[0_0_24px_rgba(60,255,115,0.35)]
        transition-all
        duration-300
        hover:scale-[1.03]
        hover:shadow-[0_0_36px_rgba(60,255,115,0.5)]
        active:scale-95
      "
    >
      {/* Shine Effect */}
      <span
        className="
          absolute
          inset-0
          -translate-x-full
          bg-gradient-to-r
          from-transparent
          via-white/35
          to-transparent
          transition-transform
          duration-700
          group-hover:translate-x-full
        "
      />

      {/* Content */}
      <span className="relative z-10">{children}</span>
      <ArrowRight
        size={16}
        className="
          relative
          z-10
          transition-transform
          duration-300
          group-hover:translate-x-1
        "
      />
    </button>
  );
}