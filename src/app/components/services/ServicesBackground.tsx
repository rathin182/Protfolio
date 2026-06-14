"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function NeuralNetwork() {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 250;
    const arr = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 30;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }

    return arr;
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();

    geo.setAttribute(
      "position",
      new THREE.BufferAttribute(
        positions,
        3
      )
    );

    return geo;
  }, [positions]);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;

    const t = clock.getElapsedTime();

    pointsRef.current.rotation.y =
      t * 0.03;

    pointsRef.current.rotation.x =
      Math.sin(t * 0.15) * 0.08;
  });

  return (
    <points
      ref={pointsRef}
      geometry={geometry}
    >
      <pointsMaterial
        color="#52ca56"
        size={0.08}
        transparent
        opacity={0.8}
      />
    </points>
  );
}

function ConnectionLines() {
  const lineRef = useRef<THREE.LineSegments>(
    null
  );

  const geometry = useMemo(() => {
    const points = [];

    for (let i = 0; i < 100; i++) {
      const x1 =
        (Math.random() - 0.5) * 30;
      const y1 =
        (Math.random() - 0.5) * 20;

      const x2 =
        x1 +
        (Math.random() - 0.5) * 4;

      const y2 =
        y1 +
        (Math.random() - 0.5) * 4;

      points.push(
        x1,
        y1,
        0,
        x2,
        y2,
        0
      );
    }

    const geo =
      new THREE.BufferGeometry();

    geo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(
        points,
        3
      )
    );

    return geo;
  }, []);

  useFrame(({ clock }) => {
    if (!lineRef.current) return;

    lineRef.current.rotation.y =
      clock.getElapsedTime() * 0.02;
  });

  return (
    <lineSegments
      ref={lineRef}
      geometry={geometry}
    >
      <lineBasicMaterial
        color="#52ca56"
        transparent
        opacity={0.15}
      />
    </lineSegments>
  );
}

function FloatingOrb({
  position,
}: {
  position: [number, number, number];
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;

    const t = clock.getElapsedTime();

    ref.current.position.y =
      position[1] +
      Math.sin(t + position[0]) *
        0.5;
  });

  return (
    <mesh
      ref={ref}
      position={position}
    >
      <sphereGeometry
        args={[0.18, 16, 16]}
      />
      <meshBasicMaterial
        color="#52ca56"
      />
    </mesh>
  );
}

export default function ServicesBackground() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{
          position: [0, 0, 12],
          fov: 60,
        }}
      >
        <NeuralNetwork />

        <ConnectionLines />

        <FloatingOrb
          position={[
            -8,
            3,
            0,
          ]}
        />

        <FloatingOrb
          position={[
            5,
            -2,
            0,
          ]}
        />

        <FloatingOrb
          position={[
            0,
            4,
            0,
          ]}
        />
      </Canvas>
    </div>
  );
}