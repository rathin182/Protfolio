"use client";

import { motion } from "framer-motion";

const particles = [
  {
    size: 8,
    x: "12%",
    y: "18%",
    delay: 0,
  },
  {
    size: 6,
    x: "26%",
    y: "72%",
    delay: 0.6,
  },
  {
    size: 10,
    x: "82%",
    y: "20%",
    delay: 1.2,
  },
  {
    size: 5,
    x: "74%",
    y: "66%",
    delay: 0.8,
  },
  {
    size: 7,
    x: "56%",
    y: "10%",
    delay: 1.5,
  },
  {
    size: 5,
    x: "8%",
    y: "52%",
    delay: 2,
  },
  {
    size: 8,
    x: "92%",
    y: "48%",
    delay: 0.4,
  },
  {
    size: 6,
    x: "42%",
    y: "88%",
    delay: 1,
  },
];

export default function FloatingParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((particle, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full bg-[#39ff5a]"
          style={{
            width: particle.size,
            height: particle.size,
            left: particle.x,
            top: particle.y,
            boxShadow:
              "0 0 12px rgba(57,255,90,.8), 0 0 28px rgba(57,255,90,.35)",
          }}
          animate={{
            y: [0, -18, 0],
            x: [0, 8, 0],
            opacity: [0.25, 1, 0.25],
            scale: [0.8, 1.25, 0.8],
          }}
          transition={{
            duration: 4 + (index % 3),
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
          }}
        />
      ))}

      {/* Small glow particles */}

      {particles.map((particle, index) => (
        <motion.div
          key={`glow-${index}`}
          className="absolute rounded-full bg-[#39ff5a]/30 blur-md"
          style={{
            width: particle.size * 4,
            height: particle.size * 4,
            left: particle.x,
            top: particle.y,
            transform: "translate(-35%, -35%)",
          }}
          animate={{
            opacity: [0.1, 0.35, 0.1],
            scale: [0.8, 1.5, 0.8],
          }}
          transition={{
            duration: 4 + (index % 3),
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  );
}