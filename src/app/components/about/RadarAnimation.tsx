"use client";

import { Code2 } from "lucide-react";

export default function RadarAnimation() {
  return (
    <div
      className="
        relative flex items-center justify-center
        h-[240px] w-[240px]
        sm:h-[300px] sm:w-[300px]
        md:h-[340px] md:w-[340px]
        lg:h-[380px] lg:w-[380px]
        scale-100
      "
    >
      {/* ================= Glow ================= */}
      <div className="absolute h-[65%] w-[65%] rounded-full bg-[#39ff5a]/[0.06] blur-3xl" />

      {/* ================= Outer Rings ================= */}
      {/* ================= Vertical Ellipse Rings ================= */}
      {[
        { w: "86.8%", h: "113.1%" },
        { w: "69.7%", h: "93.4%" },
        { w: "52.6%", h: "73.6%" },
        { w: "36.8%", h: "52.6%" },
      ].map((ring, i) => (
        <div
          key={i}
          className="absolute rounded-full border border-[#39ff5a]/10"
          style={{
            width: ring.w,
            height: ring.h,
          }}
        />
      ))}

      {/* ================= Dotted Ellipse Rings ================= */}
      {[
        { w: "78.9%", h: "103.9%" },
        { w: "61.8%", h: "84.2%" },
        { w: "44.7%", h: "63.1%" },
      ].map((ring, i) => (
        <div
          key={i}
          className="absolute rounded-full border border-dashed border-[#39ff5a]/10"
          style={{
            width: ring.w,
            height: ring.h,
          }}
        />
      ))}

      {/* ================= Scattered Dots ================= */}
      <div className="absolute h-[93%] w-[93%]">
        <span className="absolute left-[8%] top-[38%] h-[4px] w-[4px] rounded-full bg-[#39ff5a]/50" />
        <span className="absolute left-[20%] top-[78%] h-[4px] w-[4px] rounded-full bg-[#39ff5a]/40" />
        <span className="absolute right-[10%] top-[20%] h-[4px] w-[4px] rounded-full bg-[#39ff5a]/60" />
        <span className="absolute right-[4%] top-[55%] h-[3px] w-[3px] rounded-full bg-[#39ff5a]/40" />
        <span className="absolute left-[4%] top-[15%] h-[3px] w-[3px] rounded-full bg-[#39ff5a]/30" />
        <span className="absolute bottom-[10%] right-[22%] h-[3px] w-[3px] rounded-full bg-[#39ff5a]/40" />
      </div>

      {/* ================= Comet Streak (top right) ================= */}
      <div
        className="
          absolute
          right-[6%]
          top-[10%]
          h-px
          w-[24%]
          origin-right
          rotate-[-35deg]
          bg-gradient-to-l
          from-[#39ff5a]
          via-[#39ff5a]/40
          to-transparent
          shadow-[0_0_10px_#39ff5a]
        "
      />
      <span className="absolute right-[5%] top-[9%] h-[5px] w-[5px] rounded-full bg-[#39ff5a] shadow-[0_0_12px_#39ff5a]" />

      {/* ================= Rotating Sweep ================= */}
      <div
        className="
          absolute
          h-[78%]
          w-[78%]
          animate-[spin_8s_linear_infinite]
        "
      >
        <div
          className="
            absolute
            left-1/2
            top-1/2
            h-1/2
            w-px
            -translate-x-1/2
            -translate-y-full
            origin-bottom
            bg-gradient-to-t
            from-[#39ff5a]
            via-[#39ff5a]/30
            to-transparent
            shadow-[0_0_22px_#39ff5a]
          "
        />
        {/* Radar Dot */}
        <div className="absolute left-1/2 top-0 h-2 w-2 sm:h-2.5 sm:w-2.5 -translate-x-1/2 rounded-full bg-[#39ff5a] shadow-[0_0_16px_#39ff5a]" />
      </div>

      {/* ================= Center Circle ================= */}
      <div className="relative z-10 flex h-20 w-20 sm:h-28 sm:w-28 md:h-32 md:w-32 items-center justify-center">
        {/* Outer Glow */}
        <div
          className="
            absolute
            inset-[-28px]
            sm:inset-[-38px]
            md:inset-[-45px]
            rounded-full
            bg-[#39ff5a]/20
            blur-3xl
            animate-pulse
          "
        />

        {/* Main Circle */}
        <div
          className="
            relative
            flex
            h-20
            w-[66px]
            sm:h-28
            sm:w-[92px]
            md:h-32
            md:w-[104px]
            items-center
            justify-center
            rounded-full
            border
            border-[#39ff5a]/70
            shadow-[0_0_18px_rgba(57,255,90,0.7),0_0_42px_rgba(57,255,90,0.55),0_0_85px_rgba(57,255,90,0.35),inset_0_0_24px_rgba(57,255,90,0.25)]
          "
        >
          <Code2
            className="
              text-[#39ff5a]
              drop-shadow-[0_0_12px_rgba(57,255,90,0.9)]
              w-8 h-8
              sm:w-10 sm:h-10
              md:w-[52px] md:h-[52px]
            "
          />
        </div>
      </div>
    </div>
  );
}