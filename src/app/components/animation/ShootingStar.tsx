"use client";

import { Trail } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function ShootingStar() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;

    const t = clock.getElapsedTime() % 5;
    const progress = t / 5;

    ref.current.position.set(
      -5 + progress * 10,
      3 - progress * 5,
      3
    );
  });

  return (
    <Trail
      width={1}
      length={6}
      color="#4eca52"
      attenuation={(t) => t * t}
    >
      <mesh ref={ref}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial color="white" />
      </mesh>
    </Trail>
  );
}