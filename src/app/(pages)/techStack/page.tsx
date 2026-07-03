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
        <div className=" w-full h-24 sm:h-28 md:h-30 flex items-center justify-center bg-gradient-to-r from-[#52ca56]/10 via-white/[0.03] to-[#52ca56]/10 backdrop-blur-2xl border border-[#52ca56]/20 shadow-[0_0_30px_rgba(82,202,86,0.08)] text-white rounded-xl relative overflow-hidden">
            <HeroBackground />

            {/* Glass shine */}
            <div className=" absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shine_4s_linear_infinite] z-10" />

            {/* Fade edges so the marquee looks seamless entering/leaving the container */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-16 md:w-24 bg-gradient-to-r from-[#02070b] to-transparent z-20" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-16 md:w-24 bg-gradient-to-l from-[#02070b] to-transparent z-20" />

            {/* Marquee track: two copies of the list placed back to back and
                translated by exactly -50% so the loop is seamless */}
            <div className="relative z-10 w-full overflow-hidden">
                <div className="flex w-max items-center gap-8 sm:gap-12 md:gap-16 lg:gap-20 animate-[marquee_28s_linear_infinite] hover:[animation-play-state:paused]">
                    {[...techStack, ...techStack].map((tech, index) => (
                        <div
                            key={`${tech.label}-${index}`}
                            className="flex flex-col items-center gap-1.5 sm:gap-2 shrink-0"
                        >
                            <Image
                                src={tech.src}
                                alt={tech.label}
                                width={40}
                                height={40}
                                className="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 object-contain"
                            />
                            <span className="text-white text-[11px] sm:text-xs md:text-sm whitespace-nowrap">
                                {tech.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                @keyframes marquee {
                    from {
                        transform: translateX(0);
                    }
                    to {
                        transform: translateX(-50%);
                    }
                }
            `}</style>
        </div>
    )
}

export default TexhStack