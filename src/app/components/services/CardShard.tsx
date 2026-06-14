"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

type Props = {
  position: [number, number, number];
  velocity: [number, number, number];
};

export default function CardShard({
  position,
  velocity,
}: Props) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!ref.current) return;

    ref.current.position.x += velocity[0];
    ref.current.position.y += velocity[1];
    ref.current.position.z += velocity[2];

    ref.current.rotation.x += 0.02;
    ref.current.rotation.y += 0.03;
    ref.current.rotation.z += 0.01;
  });

  return (
    <mesh ref={ref} position={position}>
      <boxGeometry args={[1.2, 1.2, 0.08]} />
      <meshStandardMaterial
        color="#0b1117"
        emissive="#52ca56"
        emissiveIntensity={0.8}
      />
    </mesh>
  );
}