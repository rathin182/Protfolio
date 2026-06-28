"use client";

import { Code2, Brain, Zap, Users } from "lucide-react";
import SkillBar from "./SkillBar";
import GlowButton from "./GlowButton";
import RadarAnimation from "./RadarAnimation";
import HeroBackground from "../animation/HeroBackground";

const skills = [
  { title: "Clean Code", value: 80, icon: Code2 },
  { title: "Problem Solving", value: 60, icon: Brain },
  { title: "Fast Learner", value: 90, icon: Zap },
  { title: "Team Player", value: 75, icon: Users },
];

export default function AboutMe() {
  return (
    <div
    id="about"
      className="
        relative
        flex
        h-screen
        w-full
        max-w-7xl
        overflow-hidden
        bg-[#02070B]
      "
    >
      <HeroBackground />
      {/* LEFT */}
      <div className="relative z-10 flex w-1/2 flex-col justify-center px-14 py-12">
        {/* Small Title */}
        <span
          className="
            text-xs
            font-bold
            uppercase
            tracking-[0.35em]
            text-[#3CFF73]
          "
        >
          WHO AM I
        </span>

        {/* Heading */}
        <h2
          className="
            mt-3
            text-4xl
            font-bold
            text-white
          "
        >
          About Me
        </h2>

        {/* Description */}
        <p
          className="
            mt-4
            max-w-md
            text-[15px]
            leading-7
            text-white/55
          "
        >
          I'm a passionate Full Stack Developer who loves
          turning ideas into scalable, high-performance web
          applications. I focus on writing clean, efficient
          code and delivering products that make an impact.
        </p>

        {/* Skills */}
        <div className="mt-8 space-y-5">
          {skills.map((skill) => (
            <SkillBar
              key={skill.title}
              title={skill.title}
              value={skill.value}
              icon={skill.icon}
            />
          ))}
        </div>

        {/* Button */}
        <div className="mt-8">
          <GlowButton>More About Me</GlowButton>
        </div>
      </div>

      {/* RIGHT */}
      <div className="relative flex w-1/2 items-center justify-start overflow-hidden -ml-18">
        {/* Animated Radar */}
        <RadarAnimation />
      </div>

      {/* Border Glow */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
        "
      />
    </div>
  );
}