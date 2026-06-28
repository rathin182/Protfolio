"use client";

import { Code2 } from "lucide-react";

export default function RadarAnimation() {
  return (
    <div className="relative flex h-[380px] w-[380px] items-center justify-center">
      {/* ================= Glow ================= */}
      <div className="absolute h-[280px] w-[280px] rounded-full bg-[#39ff5a]/[0.06] blur-3xl" />

      {/* ================= Outer Rings ================= */}
      {/* ================= Vertical Ellipse Rings ================= */}
      {[
        { w: 330, h: 430 },
        { w: 265, h: 355 },
        { w: 200, h: 280 },
        { w: 140, h: 200 },
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
        { w: 300, h: 395 },
        { w: 235, h: 320 },
        { w: 170, h: 240 },
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
      <div className="absolute h-[355px] w-[355px]">
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
          w-[90px]
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
          h-[295px]
          w-[295px]
          animate-[spin_8s_linear_infinite]
        "
      >
        <div
          className="
            absolute
            left-1/2
            top-1/2
            h-[147px]
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
        <div className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[#39ff5a] shadow-[0_0_16px_#39ff5a]" />
      </div>

      {/* ================= Center Circle ================= */}
      <div className="relative z-10 flex h-32 w-32 items-center justify-center">
        {/* Outer Glow */}
        <div
          className="
            absolute
            inset-[-45px]
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
            h-32
            w-[104px]
            items-center
            justify-center
            rounded-full
            border
            border-[#39ff5a]/70
            shadow-[0_0_18px_rgba(57,255,90,0.7),0_0_42px_rgba(57,255,90,0.55),0_0_85px_rgba(57,255,90,0.35),inset_0_0_24px_rgba(57,255,90,0.25)]
          "
        >
          <Code2
            size={52}
            className="
              text-[#39ff5a]
              drop-shadow-[0_0_12px_rgba(57,255,90,0.9)]
            "
          />
        </div>
      </div>
    </div>
  );
}