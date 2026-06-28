"use client";

import { Html } from "@react-three/drei";
import { a, useSpring } from "@react-spring/three";
import ProjectCard, { type Project } from "./ProjectCard";

export type Slot = "left" | "center" | "right" | "enter-left" | "enter-right";

/**
 * Stage 3/4 — Transform targets for each slot.
 *
 * "enter-left" / "enter-right" are off-screen staging positions used
 * only for the brief instant a fresh card swaps into the left/right
 * slot key, so it can animate IN from further out rather than just
 * popping into [-5,0,-2] / [5,0,-2]. See ProjectCarousel for usage.
 */
export const SLOT_TRANSFORMS: Record<
  Slot,
  { position: [number, number, number]; rotationY: number; scale: number; opacity: number }
> = {
  center: { position: [0, 0, 0], rotationY: 0, scale: 1, opacity: 1 },
  left: { position: [-5, 0, -2], rotationY: 25 * (Math.PI / 180), scale: 0.85, opacity: 0.75 },
  right: { position: [5, 0, -2], rotationY: -25 * (Math.PI / 180), scale: 0.85, opacity: 0.75 },
  "enter-left": { position: [-9, 0, -4], rotationY: 40 * (Math.PI / 180), scale: 0.6, opacity: 0 },
  "enter-right": { position: [9, 0, -4], rotationY: -40 * (Math.PI / 180), scale: 0.6, opacity: 0 },
};

interface Card3DProps {
  project: Project;
  slot: Slot;
  onClick?: () => void;
}

export default function Card3D({ project, slot, onClick }: Card3DProps) {
  const target = SLOT_TRANSFORMS[slot];
  const isCenter = slot === "center";

  const { position, rotationY, scale, opacity } = useSpring({
    position: target.position,
    rotationY: target.rotationY,
    scale: target.scale,
    opacity: target.opacity,
    config: {
      mass: 1,
      tension: 170,
      friction: 26,
    },
  });

  return (
    <a.group
      position={position as unknown as [number, number, number]}
      rotation-y={rotationY}
      scale={scale}
    >
      <Html
        transform
        distanceFactor={6}
        // Keep pointer events working only where we want clicks
        style={{
          pointerEvents: "auto",
        }}
        zIndexRange={isCenter ? [30, 0] : [10, 0]}
        occlude={false}
      >
        <a.div
          onClick={onClick}
          style={{
            opacity,
            cursor: isCenter ? "default" : "pointer",
            // Slight scale-down on hover handled in stage 5 (polish)
          }}
        >
          <ProjectCard {...project} active={isCenter} />
        </a.div>
      </Html>
    </a.group>
  );
}