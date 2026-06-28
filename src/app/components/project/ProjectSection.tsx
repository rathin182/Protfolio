"use client";

import HeroBackground from "@/app/components/animation/HeroBackground";
import ProjectScene from "@/app/components/project/ProjectScene";

export default function ProjectSection() {
  return (
    <section className="relative bg-[#02070B] py-25 h-screen overflow-hidden">
      {/* Background glow */}
      <HeroBackground />

      {/* The 3D scene now owns the entire card layout - it positions
          left/center/right cards itself via 3D transforms, so it
          just needs to fill the section. */}
      <ProjectScene />
    </section>
  );
}