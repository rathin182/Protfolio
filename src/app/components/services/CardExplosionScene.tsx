"use client";

import { Canvas } from "@react-three/fiber";
import CardShard from "./CardShard";

const shards = Array.from({ length: 12 }).map(
  (_, i) => ({
    position: [
      (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 2,
      0,
    ] as [number, number, number],

    velocity: [
      (Math.random() - 0.5) * 0.04,
      (Math.random() - 0.5) * 0.04,
      Math.random() * 0.03,
    ] as [number, number, number],
  })
);

export default function CardExplosionScene() {
  return (
    <div className="absolute inset-0 z-50">
      <Canvas camera={{ position: [0, 0, 8] }}>
        <ambientLight intensity={2} />

        <pointLight
          color="#52ca56"
          intensity={30}
          position={[0, 0, 2]}
        />

        {shards.map((shard, i) => (
          <CardShard
            key={i}
            position={shard.position}
            velocity={shard.velocity}
          />
        ))}
      </Canvas>
    </div>
  );
}