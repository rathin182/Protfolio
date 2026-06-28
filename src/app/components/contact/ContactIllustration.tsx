"use client";

import {
  Send,
  Sparkles,
  Diamond,
} from "lucide-react";

export default function ContactIllustration() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      {/* ================= Background Glow ================= */}

      <div
        className="
          absolute
          h-[520px]
          w-[520px]
          rounded-full
          bg-[#39ff5a]/5
          blur-[120px]
        "
      />

      {/* ================= Vertical Rings ================= */}

      {[340, 280, 220, 160].map((size, i) => (
        <div
          key={i}
          className="
            absolute
            rounded-full
            border
            border-[#39ff5a]/10
          "
          style={{
            width: size * 0.75,
            height: size,
          }}
        />
      ))}

      {/* ================= Dotted Rings ================= */}

      {[310, 250, 190].map((size, i) => (
        <div
          key={i}
          className="
            absolute
            rounded-full
            border
            border-dashed
            border-[#39ff5a]/10
          "
          style={{
            width: size * 0.75,
            height: size,
          }}
        />
      ))}

      {/* ================= Orbit Lines ================= */}

      <div className="absolute h-[420px] w-[320px] rounded-full border border-[#39ff5a]/5 rotate-[25deg]" />

      <div className="absolute h-[420px] w-[320px] rounded-full border border-[#39ff5a]/5 -rotate-[25deg]" />

      {/* ================= Dashed Flight Path ================= */}

      <svg
        className="absolute h-[420px] w-[420px]"
        viewBox="0 0 420 420"
        fill="none"
      >
        <path
          d="
          M70 290
          C110 180,
          200 150,
          260 190
          C315 225,
          315 120,
          355 80
        "
          stroke="#39ff5a"
          strokeOpacity="0.35"
          strokeWidth="2"
          strokeDasharray="8 10"
          strokeLinecap="round"
        />
      </svg>

      {/* ================= Floating Diamonds ================= */}

      <Diamond
        size={18}
        className="
          absolute
          left-[28%]
          top-[32%]
          rotate-45
          text-[#39ff5a]/70
        "
      />

      <Diamond
        size={12}
        className="
          absolute
          right-[22%]
          top-[24%]
          rotate-45
          text-[#39ff5a]/60
        "
      />

      <Diamond
        size={16}
        className="
          absolute
          right-[28%]
          bottom-[24%]
          rotate-45
          text-[#39ff5a]/60
        "
      />

      <Sparkles
        size={18}
        className="
          absolute
          left-[20%]
          bottom-[28%]
          text-[#39ff5a]/70
        "
      />

      <Sparkles
        size={16}
        className="
          absolute
          right-[18%]
          top-[42%]
          text-[#39ff5a]/70
        "
      />

      {/* ================= Center Glow ================= */}

      <div
        className="
          absolute
          h-44
          w-44
          rounded-full
          bg-[#39ff5a]/10
          blur-[80px]
        "
      />

      {/* ================= Paper Plane ================= */}

      <div
        className="
          relative
          flex
          h-32
          w-32
          items-center
          justify-center
          rounded-full
          border
          border-[#39ff5a]/30
          bg-[#071018]
          shadow-[0_0_60px_rgba(57,255,90,.28)]
        "
      >
        <div
          className="
            absolute
            inset-0
            rounded-full
            bg-[#39ff5a]/10
            blur-xl
          "
        />

        <Send
          size={58}
          strokeWidth={1.8}
          className="
            relative
            z-10
            -rotate-12
            text-[#39ff5a]
            drop-shadow-[0_0_18px_rgba(57,255,90,.8)]
          "
        />
      </div>

      {/* ================= Floating Glow Dots ================= */}

      <div className="absolute left-[34%] top-[18%] h-2 w-2 rounded-full bg-[#39ff5a]" />
      <div className="absolute right-[26%] top-[38%] h-2 w-2 rounded-full bg-[#39ff5a]/80" />
      <div className="absolute bottom-[18%] left-[38%] h-2 w-2 rounded-full bg-[#39ff5a]/70" />
      <div className="absolute bottom-[30%] right-[22%] h-1.5 w-1.5 rounded-full bg-[#39ff5a]/80" />
    </div>
  );
}