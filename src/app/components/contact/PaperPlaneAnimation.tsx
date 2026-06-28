"use client";

export default function PaperPlaneAnimation() {
  return (
    <div className="relative flex h-[300px] w-full items-center justify-center">
      {/* ================= Diamond Sparkles ================= */}
      <span className="absolute left-[14%] top-[10%] h-2 w-2 rotate-45 rounded-[2px] border border-[#3CFF73]/40" />
      <span className="absolute left-[2%] top-[44%] h-1.5 w-1.5 rotate-45 rounded-[1px] border border-[#3CFF73]/30" />
      <span className="absolute right-[6%] top-[6%] h-2.5 w-2.5 rotate-45 rounded-[2px] border border-[#3CFF73]/50" />
      <span className="absolute right-[18%] top-[40%] h-1.5 w-1.5 rotate-45 rounded-[1px] border border-[#3CFF73]/30" />
      <span className="absolute bottom-[8%] right-[2%] h-2 w-2 rotate-45 rounded-[2px] border border-[#3CFF73]/40" />
      <span className="absolute bottom-[20%] left-[10%] h-1.5 w-1.5 rotate-45 rounded-[1px] border border-[#3CFF73]/25" />

      {/* ================= Glow behind plane ================= */}
      <div className="absolute right-[18%] top-[18%] h-[160px] w-[160px] rounded-full bg-[#3CFF73]/[0.10] blur-3xl" />

      {/* ================= Dashed Flight Trail ================= */}
      <svg
        viewBox="0 0 300 220"
        className="absolute bottom-[6%] left-[2%] h-[170px] w-[230px]"
        fill="none"
      >
        <path
          d="M10 30 C 60 10, 90 70, 60 100 C 30 130, 70 150, 110 130 C 150 110, 170 60, 230 50"
          stroke="#3CFF73"
          strokeOpacity="0.55"
          strokeWidth="2"
          strokeDasharray="6 8"
          strokeLinecap="round"
        />
      </svg>

      {/* ================= Paper Plane ================= */}
      <div className="absolute right-[10%] top-[18%] drop-shadow-[0_18px_40px_rgba(60,255,115,0.35)]">
        <svg
          width="140"
          height="130"
          viewBox="0 0 140 130"
          fill="none"
          className="rotate-[8deg]"
        >
          {/* Right wing (lighter face) */}
          <path
            d="M70 18 L132 64 L70 122 L70 70 Z"
            fill="#3CFF73"
          />
          {/* Left wing (darker face, shadowed) */}
          <path
            d="M70 18 L8 64 L70 70 Z"
            fill="#1C8A41"
          />
          {/* Bottom fold (darkest) */}
          <path
            d="M8 64 L70 122 L70 70 Z"
            fill="#15672F"
          />
          {/* Centerline fold highlight */}
          <path
            d="M70 18 L70 122"
            stroke="#0E4A21"
            strokeWidth="1.5"
          />
          {/* Top edge highlight */}
          <path
            d="M70 18 L132 64"
            stroke="#8FFFB0"
            strokeWidth="1.5"
            strokeOpacity="0.6"
          />
        </svg>
      </div>
    </div>
  );
}