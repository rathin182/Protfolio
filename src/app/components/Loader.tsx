"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Loader({
  loading,
}: {
  loading: boolean;
}) {
  const [progress, setProgress] = useState(0);
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    if (!loading) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);

          setTimeout(() => {
            setReveal(true);
          }, 300);

          return 100;
        }

        return prev + 1;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [loading]);

  return (
    <motion.div
      animate={
        reveal
          ? {
              clipPath: "inset(0% 0% 100% 0%)",
            }
          : {}
      }
      transition={{
        duration: 0.9,
        ease: [0.76, 0, 0.24, 1],
      }}
      className="
        fixed
        inset-0
        z-[999999]
        overflow-hidden
        bg-black
      "
    >
      {/* TOP PANEL */}
      <motion.div
        initial={{ y: "-100%" }}
        animate={{ y: 0 }}
        className="
          absolute
          top-0
          left-0
          h-1/2
          w-full
          bg-[#02070B]
          border-b
          border-[#52ca56]/20
        "
        transition={{
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1],
        }}
      />

      {/* BOTTOM PANEL */}
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        className="
          absolute
          bottom-0
          left-0
          h-1/2
          w-full
          bg-[#02070B]
          border-t
          border-[#52ca56]/20
        "
        transition={{
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1],
        }}
      />

      {/* BACKGROUND GLOW */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.7, 0.2],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
        className="
          absolute
          left-1/2
          top-1/2
          h-[600px]
          w-[600px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#52ca56]/10
          blur-[140px]
        "
      />

      {/* ENERGY BURST */}
      <motion.div
        animate={
          reveal
            ? {
                scale: 10,
                opacity: 0,
              }
            : {
                scale: 1,
                opacity: 0.8,
              }
        }
        transition={{
          duration: 0.7,
        }}
        className="
          absolute
          left-1/2
          top-1/2
          h-28
          w-28
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#52ca56]
          blur-3xl
        "
      />

      {/* FLASH */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={
          reveal
            ? {
                opacity: [0, 1, 0],
              }
            : {}
        }
        transition={{
          duration: 0.4,
        }}
        className="
          absolute
          inset-0
          bg-white
          pointer-events-none
        "
      />

      {/* CONTENT */}
      <motion.div
        animate={
          reveal
            ? {
                scale: 1.4,
                opacity: 0,
              }
            : {
                scale: 1,
                opacity: 1,
              }
        }
        transition={{
          duration: 0.6,
        }}
        className="
          absolute
          left-1/2
          top-1/2
          z-10
          flex
          -translate-x-1/2
          -translate-y-1/2
          flex-col
          items-center
        "
      >
        {/* LOGO */}
        <motion.div
          initial={{
            opacity: 0,
            scale: 0,
            rotate: -20,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: 0,
          }}
          transition={{
            duration: 1,
            type: "spring",
          }}
        >
          <Image
            src="/logonobg2.png"
            alt="logo"
            width={140}
            height={140}
            priority
          />
        </motion.div>

        {/* GRAPH */}
        <div className="mt-10 relative h-[120px] w-[380px]">
          <svg
            viewBox="0 0 380 120"
            className="absolute inset-0 h-full w-full"
          >
            <motion.path
              d="
                M0 90
                L40 80
                L90 40
                L130 55
                L180 20
                L230 50
                L280 30
                L330 15
                L380 5
              "
              fill="none"
              stroke="#52ca56"
              strokeWidth="3"
              initial={{
                pathLength: 0,
              }}
              animate={{
                pathLength: 1,
              }}
              transition={{
                duration: 3,
              }}
            />
          </svg>
        </div>

        {/* PERCENTAGE */}
        <motion.div
          key={progress}
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="
            mt-6
            text-5xl
            font-bold
            text-[#52ca56]
          "
        >
          {progress}%
        </motion.div>

        {/* STATUS */}
        <motion.p
          animate={{
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
          }}
          className="
            mt-3
            text-sm
            tracking-[0.4em]
            uppercase
            text-white/50
          "
        >
          Initializing System
        </motion.p>
      </motion.div>
    </motion.div>
  );
}