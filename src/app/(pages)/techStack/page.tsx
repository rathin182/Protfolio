import HeroBackground from '@/app/components/animation/HeroBackground';
import Image from 'next/image'
import React from 'react'

const techStack = [
  {
    src: "/logos/image copy 3.png",
    label: "JavaScript",
    type: "javaScript",
  },
  {
    src: "/logos/image copy 4.png",
    label: "Redis",
    type: "redis",
  },
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
  {
    src: "/logos/image copy 12.png",
    label: "NextJs",
    type: "nextJs",
  },
  {
    src: "/logos/image copy 13.png",
    label: "ExpressJs",
    type: "expressJs",
  },
  {
    src: "/logos/image copy 7.png",
    label: "MongoDb",
    type: "mongoDb",
  },
  {
    src: "/logos/image copy 9.png",
    label: "PrismaOrm",
    type: "prismaOrm",
  }
];

const TexhStack = () => {
  return (
    <div
  className=" w-full h-30 flex items-center justify-center bg-gradient-to-r from-[#52ca56]/10 via-white/[0.03] to-[#52ca56]/10 backdrop-blur-2xl border border-[#52ca56]/20 shadow-[0_0_30px_rgba(82,202,86,0.08)] text-white rounded-xl relative overflow-hidden">
    <HeroBackground />
  {/* Glass shine */}
  <div
    className=" absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shine_4s_linear_infinite] " />

  <span className="relative w-full z-10">
    <div className="w-full flex items-center justify-between px-10">
  {techStack.map((tech, index) => (
    <div
      key={`${tech.label}-${index}`}
      className="flex flex-col items-center gap-2"
    >
      <Image
        src={tech.src}
        alt={tech.label}
        width={40}
        height={40}
      />

      <span className="text-white text-sm">
        {tech.label}
      </span>
    </div>
  ))}
</div>

  </span>
</div>
  )
}

export default TexhStack