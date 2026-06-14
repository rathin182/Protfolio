"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function CursorOrb() {
  const [hovering, setHovering] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const x = useSpring(mouseX, {
    stiffness: 350,
    damping: 25,
  });

  const y = useSpring(mouseY, {
    stiffness: 350,
    damping: 25,
  });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const enter = () => setHovering(true);
    const leave = () => setHovering(false);

    const elements = document.querySelectorAll(
      "button, a, .cursor-hover"
    );

    elements.forEach((el) => {
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    });

    window.addEventListener("mousemove", move);

    return () => {
      window.removeEventListener("mousemove", move);

      elements.forEach((el) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      style={{ x, y }}
      animate={{
        width: hovering ? 90 : 40,
        height: hovering ? 90 : 40,
      }}
      transition={{
        type: "spring",
        stiffness: 250,
        damping: 20,
      }}
      className="
        fixed
        left-0
        top-0
        z-[9999]
        pointer-events-none
        -translate-x-1/2
        -translate-y-1/2
        flex
        items-center
        justify-center
      "
    >
      {/* Glow */}
      <motion.div
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.25, 0.6, 0.25],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
        className="
          absolute
          inset-0
          rounded-full
          bg-[#52ca56]
          blur-2xl
        "
      />

      {/* Glass Ring */}
      <div
        className="
          absolute
          inset-0
          rounded-full
          border
          border-white/20
          bg-white/5
          backdrop-blur-md
        "
      />

      {/* Rotating Ring */}
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          absolute
          h-6
          w-6
          rounded-full
          border
          border-white/20
        "
      />

      {/* White Particle */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-0"
      >
        <div
          className="
            absolute
            top-0
            left-1/2
            h-1.5
            w-1.5
            rounded-full
            bg-white
            shadow-[0_0_10px_rgba(255,255,255,0.9)]
          "
        />
      </motion.div>

      {/* Green Particle */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-0"
      >
        <div
          className="
            absolute
            bottom-1
            left-2
            h-1.5
            w-1.5
            rounded-full
            bg-[#52ca56]
            shadow-[0_0_10px_rgba(82,202,86,0.8)]
          "
        />
      </motion.div>

      {/* Cyan Particle */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-0"
      >
        <div
          className="
            absolute
            top-4
            right-1
            h-1.5
            w-1.5
            rounded-full
            bg-cyan-400
            shadow-[0_0_10px_rgba(34,211,238,0.8)]
          "
        />
      </motion.div>

      {/* Purple Particle */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-0"
      >
        <div
          className="
            absolute
            left-1
            top-8
            h-1.5
            w-1.5
            rounded-full
            bg-violet-400
            shadow-[0_0_10px_rgba(167,139,250,0.8)]
          "
        />
      </motion.div>

      {/* Core */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
        className="
          h-2.5
          w-2.5
          rounded-full
          bg-white
          shadow-[0_0_15px_rgba(255,255,255,0.9)]
        "
      />
    </motion.div>
  );
}