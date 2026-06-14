"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const techStack = [
  {
    src: "/logos/image.png",
    label: "Node Js",
    type: "node",
  },
  {
    src: "/logos/image copy.png",
    label: "Docker",
    type: "docker",
  },
  {
    src: "/logos/image copy 8.png",
    label: "React Js",
    type: "react",
  },
  {
    src: "/logos/image copy 10.png",
    label: "PostgreSQL",
    type: "postgres",
  },
  {
    src: "/logos/image copy 2.png",
    label: "Redis",
    type: "redis",
  },
];

export default function TechStackCards() {
  return (
    <div className="absolute -right-20 top-70 -translate-y-1/2 flex flex-col gap-4 z-50">
      {techStack.map((item, i) => (
        <motion.div
          key={item.label}
          drag
          dragMomentum={false}
          dragElastic={0.18}
          initial={{
            opacity: 0,
            x: 50,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            delay: i * 0.15,
            type: "spring",
            stiffness: 250,
            damping: 20,
          }}
          whileHover={{
            scale: 1.05,
            y: -2,
          }}
          whileDrag={{
            scale: 1.1,
            rotate: 5,
            zIndex: 100,
            cursor: "grabbing",
          }}
          className="
            group
            relative
            flex
            items-center
            gap-3
            px-5
            py-3
            rounded-full
            border
            border-[#52ca56]/30
            backdrop-blur-md
            bg-[#0b1418]/80
            overflow-hidden
            cursor-grab
            select-none
            hover:border-[#52ca56]/60
            hover:shadow-[0_0_25px_rgba(82,202,86,0.25)]
            transition-all
            duration-300
          "
          style={{
            marginLeft: `${i * 14}px`,
          }}
        >
          {/* Node.js Signal Effect */}
          {item.type === "node" && (
            <motion.div
              className="
                absolute
                inset-0
                bg-gradient-to-r
                from-transparent
                via-[#52ca56]/20
                to-transparent
              "
              animate={{
                x: ["-150%", "150%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 2,
                ease: "linear",
              }}
            />
          )}

          {/* Icon */}
          <Image
            src={item.src}
            alt={item.label}
            width={28}
            height={28}
            className="relative z-10"
            draggable={false}
          />

          {/* Label */}
          <span className="relative z-10 text-sm text-white whitespace-nowrap">
            {item.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}