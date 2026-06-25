"use client";

import HeroBackground from "@/app/components/animation/HeroBackground";
import ProjectCard from "@/app/components/project/ProjectCard";

const projects = [
  {
    id: "01",
    title: "Task Management SaaS",
    description:
      "A complete task management platform with teams, projects and analytics.",
    image: "/projects/image.png",
    tech: ["Next.js", "Node.js", "PostgreSQL", "Socket.io"],
  },
  {
    id: "02",
    title: "E-Commerce Platform",
    description:
      "Full featured e-commerce platform with cart, payments and admin dashboard.",
    image: "/projects/image copy.png",
    tech: ["React", "Node.js", "MongoDB", "Stripe"],
    active: true,
  },
  {
    id: "03",
    title: "Analytics Dashboard",
    description:
      "Analytics dashboard with charts, reports and visualization.",
    image: "/projects/image copy 2.png",
    tech: ["React", "Express", "PostgreSQL", "Redis"],
  },
];

export default function ProjectSection() {
  return (
    <section className="relative  bg-[#02070B] py-25 h-screen">
      {/* Background glow */}
<HeroBackground />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#0b2d18_0%,transparent_65%)] opacity-40" />

      <div className="relative mx-auto flex w-full items-end justify-center gap-10 px-10">
        <div className="flex items-end justify-center gap-40 px-10 w-full">
            {projects.map((project) => (
          <div className="">
            <ProjectCard
            key={project.id}
            {...project}
          />
          </div>
        ))}
        </div>
      </div>
    </section>
  );
}