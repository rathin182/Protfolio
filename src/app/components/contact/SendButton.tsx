"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

type SendButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export default function SendButton({
  children,
  className = "",
  ...props
}: SendButtonProps) {
  return (
    <button
      {...props}
      className={`
        group
        relative
        inline-flex
        h-[58px]
        items-center
        justify-center
        gap-3
        overflow-hidden
        rounded-xl
        border
        border-[#39ff5a]/40
        bg-gradient-to-r
        from-[#39ff5a]
        to-[#2be65d]
        px-8
        font-semibold
        text-[#041109]
        shadow-[0_0_30px_rgba(57,255,90,0.35)]
        transition-all
        duration-300

        hover:scale-[1.03]
        hover:shadow-[0_0_45px_rgba(57,255,90,0.55)]

        active:scale-[0.98]

        ${className}
      `}
    >
      {/* Glow */}

      <span
        className="
          absolute
          inset-0
          rounded-xl
          bg-[#39ff5a]/20
          opacity-0
          blur-2xl
          transition-opacity
          duration-300
          group-hover:opacity-100
        "
      />

      {/* Shine */}

      <span
        className="
          absolute
          inset-0
          -translate-x-full
          bg-gradient-to-r
          from-transparent
          via-white/40
          to-transparent
          transition-transform
          duration-700
          group-hover:translate-x-full
        "
      />

      {/* Content */}

      <span className="relative z-10 flex items-center gap-3">
        {children}
      </span>
    </button>
  );
}