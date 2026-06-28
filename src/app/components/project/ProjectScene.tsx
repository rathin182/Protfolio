"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, Stars } from "@react-three/drei";
import ProjectCarousel from "@/app/components/project/ProjectCarousel";

export default function ProjectScene() {
  return (
    <div className="absolute inset-0">
      <Canvas
        dpr={[1, 2]}
        camera={{
          position: [0, 0.4, 11],
          fov: 36,
        }}
        gl={{
          antialias: true,
          alpha: true,
        }}
        // Html-based cards don't need shadows; keeping shadows on
        // costs perf for zero visual gain since the cards are DOM, not meshes.
        shadows={false}
      >
        {/* ========================= */}
        {/* Background */}
        {/* ========================= */}
        <color attach="background" args={["#02070B"]} />

        {/* ========================= */}
        {/* Lighting */}
        {/* ========================= */}
        <ambientLight intensity={1.4} />
        <directionalLight position={[6, 8, 8]} intensity={2.5} />
        <directionalLight position={[-6, 5, 3]} intensity={1} />
        <pointLight
          position={[0, 3, 4]}
          intensity={18}
          color="#52ca56"
          distance={18}
        />
        <pointLight position={[0, -4, 6]} intensity={6} color="#52ca56" />

        {/* ========================= */}
        {/* Atmosphere */}
        {/* ========================= */}
        <Stars radius={120} depth={60} count={2500} factor={3} fade speed={0.2} />
        <Environment preset="night" />

        {/* ========================= */}
        {/* Floor */}
        {/* ========================= */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -4.2, 0]}>
          <circleGeometry args={[18, 128]} />
          <meshStandardMaterial color="#06110d" roughness={1} metalness={0} />
        </mesh>

        {/* Glow */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -4.15, 0]}>
          <circleGeometry args={[8, 128]} />
          <meshBasicMaterial color="#52ca56" transparent opacity={0.08} />
        </mesh>

        {/* ========================= */}
        {/* Carousel */}
        {/* ========================= */}
        {/* <ProjectCarousel /> */}

        {/* ========================= */}
        {/* Camera Controls */}
        {/* ========================= */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate
          rotateSpeed={0.45}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
          minAzimuthAngle={-0.45}
          maxAzimuthAngle={0.45}
          dampingFactor={0.08}
          enableDamping
        />
      </Canvas>

      {/* vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.85)_100%)]" />
    </div>
  );
}