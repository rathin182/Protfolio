"use client";

import { useEffect, useRef, useState } from "react";
import { useSpring, animated, config } from "@react-spring/web";
import { Project } from "@/app/lib/data/projects";
import type { SpringValues } from "@react-spring/three";

// ─── Slot transforms ──────────────────────────────────────────────────────────
// These replicate the 3D spec exactly:
//   center  → [0, 0, 0]  rotationY=0°   scale=1     opacity=1
//   left    → [-x, 0, -z] rotationY=25°  scale=0.85  opacity=0.75
//   right   → [+x, 0, -z] rotationY=-25° scale=0.85  opacity=0.75
//   enter-left / enter-right → off-screen staging positions
//
// CSS translation uses pixels; we map the 3D units to a readable px scale.
// translateZ is simulated via scale (perspective camera effect).

export type Slot = "left" | "center" | "right" | "enter-left" | "enter-right";

interface Transform {
  translateX: number; // px
  translateZ: number; // px (used with perspective)
  rotateY: number;    // degrees
  scale: number;
  opacity: number;
  zIndex: number;
}

type SpringProps = SpringValues<{
  translateX: number;
  translateZ: number;
  rotateY: number;
  scale: number;
  opacity: number;
}>;

const SLOT: Record<Slot, Transform> = {
  center: {
    translateX: 0,
    translateZ: 0,
    rotateY: 0,
    scale: 1,
    opacity: 1,
    zIndex: 10,
  },
  left: {
    translateX: -380,
    translateZ: -120,
    rotateY: 25,
    scale: 0.88,
    opacity: 0.72,
    zIndex: 5,
  },
  right: {
    translateX: 380,
    translateZ: -120,
    rotateY: -25,
    scale: 0.88,
    opacity: 0.72,
    zIndex: 5,
  },
  "enter-left": {
    translateX: -820,
    translateZ: -260,
    rotateY: 45,
    scale: 0.6,
    opacity: 0,
    zIndex: 1,
  },
  "enter-right": {
    translateX: 820,
    translateZ: -260,
    rotateY: -45,
    scale: 0.6,
    opacity: 0,
    zIndex: 1,
  },
};

// ─── Individual animated card ─────────────────────────────────────────────────

interface AnimatedCardProps {
  project: Project;
  slot: Slot;
  onClick?: () => void;
}

function AnimatedCard({ project, slot, onClick }: AnimatedCardProps) {
  const t = SLOT[slot];
  const isCenter = slot === "center";
  const [hovered, setHovered] = useState(false);

  const spring = useSpring({
    translateX: t.translateX,
    translateZ: t.translateZ,
    rotateY: t.rotateY,
    scale: t.scale * (hovered && !isCenter ? 0.95 : 1),
    opacity: t.opacity,
    config: { mass: 1, tension: 180, friction: 28 },
  });

  return (
    <animated.div
      onClick={isCenter ? undefined : onClick}
      onMouseEnter={() => !isCenter && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        // Apply all transforms in order
        transform: spring.translateX.to(
          (tx) => `
            translate(-50%, -50%)
            translateZ(${t.translateZ}px)
            translateX(${tx}px)
            rotateY(${t.rotateY}deg)
            scale(${t.scale})
          `
        ),
        // Use the animated values properly
        opacity: spring.opacity,
        zIndex: t.zIndex,
        cursor: isCenter ? "default" : "pointer",
        willChange: "transform, opacity",
        // Transition for smooth feel
        pointerEvents: "auto",
      }}
    >
      <ProjectCardView
        project={project}
        active={isCenter}
        spring={spring}
      />
    </animated.div>
  );
}

// ─── Fully animated card using spring values directly ─────────────────────────

function ProjectCardView({
  project,
  active,
  spring,
}: {
  project: Project;
  active: boolean;
  spring: SpringProps;
}) {
  const { id, title, description, image, tech } = project;

  return (
    <div style={{ position: "relative", width: "320px" }}>
      {/* Outer glow */}
      <div
        style={{
          position: "absolute",
          inset: "-24px",
          borderRadius: "56px",
          background: active
            ? "radial-gradient(ellipse at center, rgba(82,202,86,0.22) 0%, transparent 70%)"
            : "radial-gradient(ellipse at center, rgba(82,202,86,0.07) 0%, transparent 70%)",
          filter: "blur(24px)",
          pointerEvents: "none",
          transition: "background 0.5s ease",
        }}
      />

      {/* Card */}
      <div
        style={{
          position: "relative",
          width: "320px",
          borderRadius: "28px",
          overflow: "hidden",
          background: "linear-gradient(160deg, #0c1c15 0%, #071018 55%, #050d12 100%)",
          border: active
            ? "1px solid rgba(82,202,86,0.38)"
            : "1px solid rgba(82,202,86,0.1)",
          boxShadow: active
            ? "0 0 70px rgba(82,202,86,0.25), 0 24px 60px rgba(0,0,0,0.65), inset 0 1px 0 rgba(82,202,86,0.18)"
            : "0 0 24px rgba(82,202,86,0.07), 0 20px 40px rgba(0,0,0,0.5)",
          transition: "border-color 0.5s ease, box-shadow 0.5s ease",
        }}
      >
        {/* Image */}
        <div style={{ position: "relative", height: "190px", overflow: "hidden" }}>
          <img
            src={image}
            alt={title}
            draggable={false}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", pointerEvents: "none" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to bottom, transparent 30%, rgba(7,16,24,0.95) 100%)",
            }}
          />
          {active && (
            <div
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                padding: "3px 11px",
                borderRadius: "999px",
                background: "rgba(82,202,86,0.15)",
                border: "1px solid rgba(82,202,86,0.45)",
                color: "#52ca56",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Featured
            </div>
          )}
        </div>

        {/* Separator */}
        <div
          style={{
            height: "1px",
            background: "linear-gradient(to right, transparent, rgba(82,202,86,0.3), transparent)",
          }}
        />

        {/* Content */}
        <div style={{ padding: "22px 26px 26px" }}>
          <span
            style={{
              display: "block",
              fontSize: "38px",
              fontWeight: 900,
              color: "#52ca56",
              lineHeight: 1,
              opacity: active ? 1 : 0.65,
              transition: "opacity 0.4s ease",
            }}
          >
            {String(id).padStart(2, "0")}
          </span>

          <h3
            style={{
              marginTop: "8px",
              fontSize: "20px",
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.25,
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </h3>

          <p
            style={{
              marginTop: "8px",
              fontSize: "12.5px",
              lineHeight: 1.65,
              color: "rgba(255,255,255,0.52)",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {description}
          </p>

          <div style={{ marginTop: "16px", display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {tech.map((item) => (
              <span
                key={item}
                style={{
                  padding: "3px 10px",
                  borderRadius: "999px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(0,0,0,0.3)",
                  color: "rgba(255,255,255,0.6)",
                  fontSize: "10.5px",
                  fontWeight: 500,
                  letterSpacing: "0.04em",
                }}
              >
                {item}
              </span>
            ))}
          </div>

          {active && (
            <div
              style={{
                marginTop: "20px",
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
                color: "#52ca56",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.05em",
              }}
            >
              <span>View Project</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M2.5 7H11.5M11.5 7L8 3.5M11.5 7L8 10.5"
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

// ─── Carousel: renders exactly 3 cards, keyed by project id ──────────────────

interface CarouselProps {
  visible: Array<{ data: Project; slot: "left" | "center" | "right" }>;
  onAdvance: () => void;
  onRetreat: () => void;
  /** Track which card id is freshly entering and from which side */
  enteringFrom: { id: number | string; from: "enter-left" | "enter-right" } | null;
}

export default function Carousel({ visible, onAdvance, onRetreat, enteringFrom }: CarouselProps) {
  return (
    <>
      {visible.map((item) => {
        const isStagingEntrance = enteringFrom && enteringFrom.id === item.data.id;
        const slot: Slot = isStagingEntrance
          ? (enteringFrom!.from as Slot)
          : (item.slot as Slot);

        return (
          <AnimatedCard
            key={item.data.id}
            project={item.data}
            slot={slot}
            onClick={() => {
              if (item.slot === "right") onAdvance();
              if (item.slot === "left") onRetreat();
            }}
          />
        );
      })}
    </>
  );
}