"use client";

import { useEffect, useRef, useState } from "react";
import { useSpring, animated, to } from "@react-spring/web";
import { projects, Project } from "@/app/lib/data/projects";
import { useProjectQueue } from "@/app/lib/hooks/useProjectQueue";
import HeroBackground from "@/app/components/animation/HeroBackground";

// ─── Slot Transforms ──────────────────────────────────────────────────────────
type Slot = "left" | "center" | "right" | "enter-left" | "enter-right";

interface Transform {
  x: number;       // px — horizontal offset from center
  z: number;       // px — depth (used with CSS perspective)
  rotateY: number; // degrees — card tilt
  scale: number;   // uniform scale
  opacity: number;
  zIndex: number;
}

// Bigger gaps between slots (x), deeper recess (z), and bigger base scale
// so the whole rig reads as full-bleed instead of a small floating widget.
const SLOT: Record<Slot, Transform> = {
  //               x      z      rotY  scale opacity  z-idx
  center: { x: 0, z: 0, rotateY: 0, scale: 1.00, opacity: 1.00, zIndex: 10 },
  left: { x: -620, z: -120, rotateY: 25, scale: 0.82, opacity: 0.7, zIndex: 5 },
  right: { x: 620, z: -120, rotateY: -25, scale: 0.82, opacity: 0.7, zIndex: 5 },
  "enter-left": { x: -1300, z: -260, rotateY: 48, scale: 0.5, opacity: 0.00, zIndex: 1 },
  "enter-right": { x: 1300, z: -260, rotateY: -48, scale: 0.5, opacity: 0.00, zIndex: 1 },
};

// ─── Individual Animated Card ─────────────────────────────────────────────────
// Key insight: each card has its OWN spring — no shared pivot.
// When slot changes, the spring updates from old→new values independently.
function AnimatedCard({ project, slot, onClick, }: { project: Project; slot: Slot; onClick?: () => void; }) {
  const t = SLOT[slot];
  const isCenter = slot === "center";
  const [hovered, setHovered] = useState(false);

  const { x, z, rotateY, scale, opacity } = useSpring({
    x: t.x,
    z: t.z,
    rotateY: t.rotateY,
    scale: t.scale * (hovered && !isCenter ? 0.96 : 1),
    opacity: t.opacity,
    config: { mass: 1, tension: 185, friction: 28 },
  });

  // Combine all spring values into a single CSS transform string
  const transform = to(
    [x, z, rotateY, scale],
    (xv, zv, ry, s) =>
      `translate(-50%, -50%) translateX(${xv}px) translateZ(${zv}px) rotateY(${ry}deg) scale(${s})`
  );

  return (
    <animated.div
      onClick={isCenter ? undefined : onClick}
      onMouseEnter={() => !isCenter && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform,
        opacity,
        zIndex: t.zIndex,
        cursor: isCenter ? "default" : "pointer",
        willChange: "transform, opacity",
        userSelect: "none",
      }}
    >
      <CardView project={project} active={isCenter} />
    </animated.div>
  );
}

// ─── Card Visual ──────────────────────────────────────────────────────────────
function CardView({ project, active }: { project: Project; active: boolean }) {
  const { id, title, description, image, tech } = project;

  return (
    <div
      className="
        relative
        w-[88vw] max-w-[640px]
        sm:w-[70vw] sm:max-w-[560px]
        lg:w-[36vw] lg:max-w-[620px]
      "
    >
      {/* Outer ambient glow */}
      <div
        style={{
          position: "absolute",
          inset: "-32px",
          borderRadius: "64px",
          background: active
            ? "radial-gradient(ellipse, rgba(82,202,86,0.22) 0%, transparent 70%)"
            : "radial-gradient(ellipse, rgba(82,202,86,0.06) 0%, transparent 70%)",
          filter: "blur(28px)",
          pointerEvents: "none",
          transition: "background 0.5s",
        }}
      />

      {/* Card shell */}
      <div
        style={{
          position: "relative",
          width: "100%",
          borderRadius: "32px",
          overflow: "hidden",
          background: "linear-gradient(150deg, #0d1c15 0%, #071018 60%, #060d13 100%)",
          border: `1px solid ${active ? "rgba(82,202,86,0.38)" : "rgba(82,202,86,0.1)"}`,
          boxShadow: active
            ? "0 0 90px rgba(82,202,86,0.24), 0 30px 80px rgba(0,0,0,0.65), inset 0 1px 0 rgba(82,202,86,0.16)"
            : "0 0 28px rgba(82,202,86,0.06), 0 22px 48px rgba(0,0,0,0.5)",
          transition: "border-color 0.5s, box-shadow 0.5s",
        }}
      >
        {/* Image */}
        <div className="relative h-[260px] sm:h-[320px] lg:h-[380px] overflow-hidden">
          <img
            src={image}
            alt={title}
            draggable={false}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              pointerEvents: "none",
            }}
          />
          {/* Image gradient overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, transparent 35%, rgba(6,13,19,0.97) 100%)",
            }}
          />
          {active && (
            <span
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                padding: "5px 14px",
                borderRadius: "999px",
                background: "rgba(82,202,86,0.14)",
                border: "1px solid rgba(82,202,86,0.45)",
                color: "#52ca56",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Featured
            </span>
          )}
        </div>

        {/* Separator glow line */}
        <div
          style={{
            height: "1px",
            background:
              "linear-gradient(to right, transparent, rgba(82,202,86,0.28), transparent)",
          }}
        />

        {/* Text content */}
        <div className="px-7 sm:px-9 pt-7 pb-8 sm:pt-8 sm:pb-9">
          {/* Project number */}
          <span
            style={{
              display: "block",
              fontSize: "48px",
              fontWeight: 900,
              color: "#52ca56",
              lineHeight: 1,
              opacity: active ? 1 : 0.6,
              transition: "opacity 0.4s",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {/* {String(id).padStart(2, "0")} */}
          </span>

          {/* Title */}
          <h3
            className="mt-2 text-[24px] sm:text-[28px] lg:text-[30px]"
            style={{
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.2,
              letterSpacing: "-0.025em",
            }}
          >
            {title}
          </h3>

          {/* Description */}
          <p
            className="mt-3 text-[14px] sm:text-[15px]"
            style={{
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.5)",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {description}
          </p>

          {/* Tech pills */}
          <div className="mt-5 flex flex-wrap gap-2.5">
            {tech.map((item) => (
              <span
                key={item}
                style={{
                  padding: "5px 13px",
                  borderRadius: "999px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(0,0,0,0.28)",
                  color: "rgba(255,255,255,0.58)",
                  fontSize: "12px",
                  fontWeight: 500,
                  letterSpacing: "0.04em",
                }}
              >
                {item}
              </span>
            ))}
          </div>

          {/* CTA */}
          {active && (
            <div
              className="mt-6 text-[14px]"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                color: "#52ca56",
                fontWeight: 600,
                letterSpacing: "0.06em",
              }}
            >
              View Project
              <svg width="15" height="15" viewBox="0 0 13 13" fill="none">
                <path
                  d="M2 6.5H11M11 6.5L7.5 3M11 6.5L7.5 10"
                  stroke="#52ca56"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Nav Dots ─────────────────────────────────────────────────────────────────
function NavDots({
  total,
  active,
  onSelect,
}: {
  total: number;
  active: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          aria-label={`Go to project ${i + 1}`}
          style={{
            width: i === active ? "34px" : "10px",
            height: "10px",
            borderRadius: "999px",
            border: "none",
            background: i === active ? "#52ca56" : "rgba(82,202,86,0.25)",
            cursor: "pointer",
            padding: 0,
            transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
            outline: "none",
          }}
        />
      ))}
    </div>
  );
}

// ─── Arrow Button ─────────────────────────────────────────────────────────────
function ArrowBtn({ dir, onClick }: { dir: "left" | "right"; onClick: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      aria-label={dir === "left" ? "Previous project" : "Next project"}
      style={{
        width: "56px",
        height: "56px",
        borderRadius: "50%",
        border: `1px solid ${hov ? "rgba(82,202,86,0.5)" : "rgba(82,202,86,0.2)"}`,
        background: hov ? "rgba(82,202,86,0.12)" : "rgba(82,202,86,0.05)",
        color: "#52ca56",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.25s ease",
        outline: "none",
        flexShrink: 0,
      }}
    >
      {dir === "left" ? (
        <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
          <path
            d="M11 4L6 9L11 14"
            stroke="#52ca56"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
          <path
            d="M7 4L12 9L7 14"
            stroke="#52ca56"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}

// ─── Main ProjectSection ──────────────────────────────────────────────────────
export default function ProjectSection() {
  const { visible, advance, retreat, centerIndex, goToIndex } =
    useProjectQueue(projects, 0);

  // Track which card is newly entering the viewport,
  // so we can stage it off-screen and animate it in.
  const prevIdsRef = useRef<Set<number>>(new Set());
  const [enteringFrom, setEnteringFrom] = useState<{
    id: number;
    from: "enter-left" | "enter-right";
  } | null>(null);

  useEffect(() => {
    const currentIds = new Set(visible.map((v) => v.data.id as number));
    const prevIds = prevIdsRef.current;

    if (prevIds.size > 0) {
      const newcomer = visible.find((v) => !prevIds.has(v.data.id as number));
      if (newcomer) {
        const from: "enter-left" | "enter-right" =
          newcomer.slot === "right" ? "enter-right" : "enter-left";
        setEnteringFrom({ id: newcomer.data.id as number, from });
        // On next RAF, clear the staging so react-spring animates to real slot
        const raf = requestAnimationFrame(() => setEnteringFrom(null));
        prevIdsRef.current = currentIds;
        return () => cancelAnimationFrame(raf);
      }
    }
    prevIdsRef.current = currentIds;
  }, [visible]);

  return (
    <section
      id="projects"
      className="relative flex h-screen w-full min-h-screen flex-col items-center justify-center overflow-hidden bg-[#02070B] py-12 font-['Inter','Segoe_UI',system-ui,sans-serif]"
    >
      {/* ── Ambient background glows ── */}
<HeroBackground />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[22%] h-[600px] w-[1100px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]"
        style={{
          background:
            "radial-gradient(ellipse, rgba(82,202,86,0.07) 0%, transparent 70%)",
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[8%] left-1/2 h-[260px] w-[650px] -translate-x-1/2 rounded-full blur-[100px]"
        style={{
          background:
            "radial-gradient(ellipse, rgba(82,202,86,0.04) 0%, transparent 70%)",
        }}
      />

      {/* ── Section Header ── */}

      {/* <div className="relative z-20 mb-[60px] px-6 text-center">
        <span
          className="mb-5 inline-block rounded-full border border-[#52ca56]/30 bg-[#52ca56]/[0.08] px-4 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#52ca56]"
        >
          Portfolio
        </span>

        <h2 className="m-0 text-[clamp(36px,5vw,56px)] font-extrabold leading-[1.1] tracking-[-0.03em] text-white">
          Featured{" "}
          <span
            style={{
              background:
                "linear-gradient(135deg,#52ca56 0%,#3aaa3e 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Projects
          </span>
        </h2>

        <p className="mx-auto mt-4 max-w-[440px] text-[15px] leading-[1.6] text-white/45">
          A curated selection of work — click the side cards or arrows to
          explore.
        </p>
      </div> */}

      {/* ── 3D Carousel Stage ── */}
      {/* Full width + most of the viewport height, so the rig itself */}
      {/* fills the screen and there's generous room for left/right slots. */}

      <div
        className="relative z-10 h-[72vh] min-h-[480px] w-full"
        style={{
          perspective: "1600px",
          perspectiveOrigin: "50% 45%",
        }}
      >
        <div
          className="relative h-full w-full"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {visible.map((item) => {
            const isStagingEntrance =
              enteringFrom &&
              enteringFrom.id === (item.data.id as number);

            const slot: Slot = isStagingEntrance
              ? (enteringFrom!.from as Slot)
              : (item.slot as Slot);

            return (
              <AnimatedCard
                key={item.data.id}
                project={item.data}
                slot={slot}
                onClick={() => {
                  if (item.slot === "right") advance();
                  if (item.slot === "left") retreat();
                }}
              />
            );
          })}
        </div>
      </div>

      {/* ── Controls ── */}

      <div className="relative z-20 mt-10 flex items-center gap-7">
        <ArrowBtn dir="left" onClick={retreat} />

        <NavDots
          total={projects.length}
          active={centerIndex}
          onSelect={goToIndex}
        />

        <ArrowBtn dir="right" onClick={advance} />
      </div>

      {/* ── Decorative bottom line ── */}

      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 h-px w-[60%] max-w-[700px] -translate-x-1/2"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(82,202,86,0.15), transparent)",
        }}
      />
    </section>
  );
}