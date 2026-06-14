"use client";

import { motion } from "framer-motion";

export default function CardFragment({
  children,
  clipPath,
  index,
}: {
  children: React.ReactNode;
  clipPath: string;
  index: number;
}) {
  const randomX =
    (Math.random() - 0.5) * 600;

  const randomY =
    (Math.random() - 0.5) * 400;

  const randomRotate =
    (Math.random() - 0.5) * 180;

  return (
    <motion.div
      initial={{
        x: 0,
        y: 0,
        rotate: 0,
      }}
      animate={{
        x: randomX,
        y: randomY,
        rotate: randomRotate,
        opacity: 0,
      }}
      transition={{
        duration: 1.8,
        delay: index * 0.03,
      }}
      className="absolute inset-0"
      style={{
        clipPath,
      }}
    >
      {children}
    </motion.div>
  );
}