"use client";

import { InputHTMLAttributes } from "react";

type ContactInputProps =
  InputHTMLAttributes<HTMLInputElement>;

export default function ContactInput({
  className = "",
  ...props
}: ContactInputProps) {
  return (
    <div className="group relative">
      {/* Glow */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          rounded-xl
          bg-[#39ff5a]/0
          blur-xl
          transition-all
          duration-300
          group-focus-within:bg-[#39ff5a]/10
        "
      />

      {/* Input */}

      <input
        {...props}
        className={`
          relative
          h-[58px]
          w-full
          rounded-xl
          border
          border-[#39ff5a]/10
          bg-[#071018]/70
          px-5
          text-[15px]
          font-medium
          text-white
          placeholder:text-white/30
          outline-none
          backdrop-blur-xl
          transition-all
          duration-300

          hover:border-[#39ff5a]/20

          focus:border-[#39ff5a]/50
          focus:bg-[#071018]/90
          focus:shadow-[0_0_18px_rgba(57,255,90,.18)]

          ${className}
        `}
      />
    </div>
  );
}