"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function HeroParticles() {
  const pointsRef = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const particleCount = 1500;

    const positions = new Float32Array(
      particleCount * 3
    );

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] =
        (Math.random() - 0.5) * 15;

      positions[i * 3 + 1] =
        (Math.random() - 0.5) * 15;

      positions[i * 3 + 2] =
        (Math.random() - 0.5) * 15;
    }

    const geometry = new THREE.BufferGeometry();

    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(
        positions,
        3
      )
    );

    return geometry;
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;

    const t = clock.getElapsedTime();

    pointsRef.current.rotation.y = t * 0.05;

    pointsRef.current.rotation.x =
      Math.sin(t * 0.2) * 0.1;
  });

  return (
    <points
      ref={pointsRef}
      geometry={geometry}
    >
      <pointsMaterial
        color="#4eca52"
        size={0.035}
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}