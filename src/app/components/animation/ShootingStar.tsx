"use client";

import { Trail } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const PATHS = [
  {
    start: new THREE.Vector3(-8, 5, 3),
    end: new THREE.Vector3(8, -2, 3),
  },
  {
    start: new THREE.Vector3(-6, 2, 3),
    end: new THREE.Vector3(7, 6, 3),
  },
  {
    start: new THREE.Vector3(-9, -1, 3),
    end: new THREE.Vector3(9, 3, 3),
  },
];

export function ShootingStar() {
  const ref = useRef<THREE.Mesh>(null);

  const currentPath = useRef(0);

  useFrame(({ clock }) => {
    if (!ref.current) return;

    const totalCycle = 9; // 3 sec per path
    const t = clock.getElapsedTime() % totalCycle;

    const pathIndex = Math.floor(t / 3);

    currentPath.current = pathIndex;

    const localTime = t % 3;

    const visible = localTime < 1.4;

    ref.current.visible = visible;

    if (!visible) return;

    const progress = localTime / 1.4;

    const path = PATHS[pathIndex];

    ref.current.position.lerpVectors(
      path.start,
      path.end,
      progress
    );

    const scale =
      1 + Math.sin(progress * Math.PI) * 0.4;

    ref.current.scale.setScalar(scale);
  });

  return (
    <Trail
      width={1.2}
      length={8}
      color="#4eca52"
      attenuation={(t) => t * t}
    >
      <mesh ref={ref}>
        <sphereGeometry args={[0.18, 24, 24]} />
        <meshBasicMaterial
          color="#02070B"
          toneMapped={false}
        />
      </mesh>
    </Trail>
  );
}