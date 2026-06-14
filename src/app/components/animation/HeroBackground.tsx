"use client";

import { Canvas } from "@react-three/fiber";
import HeroParticles from "./HeroParticles";
import { ShootingStar } from "./ShootingStar";

export default function HeroBackground() {
  return (
    <div className="absolute inset-0">
      <Canvas camera={{ position: [0, 0, 8] }}>
        <HeroParticles />
        {/* <ShootingStar /> */}
      </Canvas>
    </div>
  );
}