"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const titles = [
  "Web Applications",
  "SaaS Products",
  "AI Solutions",
  "Developer Platforms",
  "Modern Experiences",
];

export default function HeroText() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % titles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-2">
      {/* TOP */}
      <span className="text-6xl font-semibold tracking-tight">
        I Build Scalable
      </span>

      {/* ANIMATED CENTER */}
      <div className="relative h-[80px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={titles[index]}
            initial={{
              y: 60,
              opacity: 0,
              filter: "blur(12px)",
            }}
            animate={{
              y: 0,
              opacity: 1,
              filter: "blur(0px)",
            }}
            exit={{
              y: -60,
              opacity: 0,
              filter: "blur(12px)",
            }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute left-0 top-0"
          >
            <span className="text-6xl font-semibold text-[#4eca52] tracking-tight">
              {titles[index]}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* BOTTOM */}
      <span className="text-6xl font-semibold tracking-tight">
        That Solve Real Problems
      </span>
    </div>
  );
}